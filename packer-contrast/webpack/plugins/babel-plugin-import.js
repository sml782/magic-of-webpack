// const babel = require('@babel/core');
const types = require('babel-types');

const visitor = {
  ImportDeclaration: {
    enter(path, state = { opts }) {
      const { specifiers } = path.node; // [{ flatten, concat }]
      const { source } = path.node; // lodash
      if (
        state.opts.library === source.value &&
        !types.isImportDefaultSpecifier(specifiers[0])
      ) {
        const declarations = specifiers.map((specifier, index) => {
          return types.ImportDeclaration(
            [types.importDefaultSpecifier(specifier.local)],
            types.stringLiteral(`${source.value}/${specifier.local.name}`),
          );
        });
        path.replaceWithMultiple(declarations);
      }
    },
  },
};
module.exports = function (babel) {
  return { visitor };
};
