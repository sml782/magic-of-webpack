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
    // 强制行注释的位置
    // 'line-comment-position': [2, { position: 'above' }],
    // 强制注释周围有空行
    // 'lines-around-comment': [
    //   2,
    //   {
    //     // 要求在行级注释之前有一空行
    //     beforeLineComment: true,
    //     // 要求在块级注释之前有一空行
    //     beforeBlockComment: true,
    //   }
    // ]
  },
};
