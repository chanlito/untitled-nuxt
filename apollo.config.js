module.exports = {
  client: {
    service: {
      name: 'untitled',
      url: 'http://localhost:9000/graphql',
    },
    // Files processed by the extension
    includes: ['client/**/*.js', 'client/**/*.ts', 'client/**/*.vue'],
  },
};
