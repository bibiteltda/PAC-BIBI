const client = require('prom-client');

module.exports = {

  friendlyName: 'Get metrics',

  description: 'Exibe métricas Prometheus do sistema.',

  exits: {
    success: {
      description: 'Métricas geradas com sucesso.'
    }
  },

  fn: async function (_, exits) {
    this.res.set('Content-Type', client.register.contentType);
    return exits.success(await client.register.metrics());
  }

};
