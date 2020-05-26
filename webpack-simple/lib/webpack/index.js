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
  }

  parse(filepath) {
    const dirName = path.dirname(filepath);
    const content = fs.readFileSync(filepath, 'utf-8');
    const parsedAst = parser.parse(content, {
      sourceType: 'module',
    });
    // console.log(parsedAst);
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
    console.log(code);

    return {
      entry: filepath,
      dependencies,
      code,
    }
  }

  file() {

  }

  run() {
    const info = this.parse(this.entry);
  }
}

module.exports = Webpack;