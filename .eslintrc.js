module.exports = {
  // extends: [
  //   'alloy',
  //   'alloy/react',
  // ],
  extends: [
    'eslint-config-ali/react',
    'eslint-config-ali/jsx-a11y',
  ],
  // plugins: [
  //   'react',
  // ],
  env: {
    browser: true,
    node: true,
    mocha: true,
    jest: true,
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    // Customize your rules

  },
};
