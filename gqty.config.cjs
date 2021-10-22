/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: true,
  scalarTypes: { DateTime: 'string' },
  introspection: { endpoint: 'http://localhost:9005/graphql', headers: {} },
  destination: './src/shared/api/index.ts',
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
