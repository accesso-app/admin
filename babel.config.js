/* eslint-disable sonarjs/no-duplicate-string */

const factories = ['shared/lib/page-routing', 'entities/session'];

module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    ['effector/babel-plugin', { factories }],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
  ],
  env: {
    production: {
      plugins: [
        [
          'styled-components',
          {
            displayName: false,
            fileName: false,
            minify: true,
            transpileTemplateLiterals: true,
            pure: true,
            namespace: 'auw',
          },
        ],
      ],
    },
    development: {
      plugins: [
        ['effector/babel-plugin', { factories, addLoc: true, addNames: true }],
        // [
        //   'module-resolver',
        //   {
        //     root: ['./src/'],
        //     alias: {
        //       effector: 'effector-logger',
        //     },
        //   },
        // ],
      ],
    },
    test: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['./src/'],
            alias: {
              effector: 'effector-root',
              'effector-react': 'effector-react/ssr',
              '@effector/reflect': '@effector/reflect/ssr',
            },
          },
        ],
      ],
    },
  },
};
