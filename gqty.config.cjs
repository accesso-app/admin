/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: false,
  scalarTypes: { DateTime: 'string', UUID: 'string' },
  introspection: { endpoint: 'http://localhost:9005/graphql', headers: {} },
  destination: './src/shared/api/index.ts',
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
