const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const core = require("@babel/core");
const traverse = require('@babel/traverse').default;

class Webpack {
  constructor(options = {}) {
    const { entry, output } = options || {};
    this.entry = entry;
    this.output = output;
    this.options = options;
    this.modules = [];
  }

  parse(filepath) {
    if (!filepath) {
      return null;
    }
    // 1. 读取文件内容
    const content = fs.readFileSync(filepath, 'utf-8');
    const parsedAst = parser.parse(content, {
      sourceType: 'module',
    });
    // console.log(parsedAst);

    // 找出相对目录
    const dirName = path.dirname(filepath);
    const dependencies = {};
    traverse(parsedAst, {
      ImportDeclaration ({ node }) {
        const depPath = node.source.value;
        const resolvePath = `./${path.join(dirName, depPath)}`;
        dependencies[depPath] = resolvePath;
      }
    });
    
    const { code, map, ast } = core.transformFromAstSync(parsedAst, null, {
      presets: ['@babel/preset-env'],
    });
    // console.log('code', code);
    // console.log('fileinfo', {
    //   entry: filepath,
    //   dependencies,
    //   code,
    // });
    return {
      entry: filepath,
      dependencies,
      code,
    };
  }

  file(runtimeCode) {
    const rCode = JSON.stringify(runtimeCode);
    const bundleEntry = `
(function (rcode) {
  function require(modulePath) {
    function nextRequire(nextModulePath) {
      return require(rcode[modulePath].dependencies[nextModulePath]);
    }
    var exports = {};
    (function (require, exports, code) {
      eval(code);
    })(nextRequire, exports, rcode[modulePath].code);
  }
  require('${this.entry}')
})(${rCode});
    `;

    const { path: outPath, filename: outFilename } = this.output;
    const outputFile = path.join(outPath, outFilename);

    if (!fs.existsSync(outPath)) {
      fs.mkdirSync(outPath);
    }

    const writeStream = fs.createWriteStream(outputFile, { encoding: 'utf8' });
    writeStream.write(bundleEntry, 'utf8', () => {
      console.log('打包构建完成')
    });
  }

  run() {
    const info = this.parse(this.entry);
    this.modules = [info];

    function recurModules(curIndex = 0) {
      const moduleInfo = this.modules[curIndex];
      if (moduleInfo) {
        const deps = moduleInfo.dependencies || {};
        Object.keys(deps).forEach(rPath => {
          const childModuleInfo = this.parse(deps[rPath]);
          if (!childModuleInfo) {
            return;
          }
          this.modules.push(childModuleInfo);
        });
      }
      const len = this.modules.length;
      if (curIndex >= len - 1) {
        return;
      }
      return recurModules.call(this, curIndex + 1);
    }
    recurModules.call(this);
    // console.log(this.modules);

    const runtimeCode = {};
    this.modules.forEach(m => {
      runtimeCode[m.entry] = {
        dependencies: m.dependencies,
        code: m.code,
      };
    });

    // console.log(runtimeCode);

    this.file(runtimeCode);
  }
}

module.exports = Webpack;