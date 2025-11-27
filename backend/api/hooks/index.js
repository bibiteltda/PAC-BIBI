const client = require('prom-client');

module.exports = function metricsHook(sails) {
  return {
    initialize: async function () {
      sails.log.info('🔧 Metrics hook initialized.');

      // métricas que precisamos
      global.metrics = {
        httpRequestDuration: new client.Histogram({
          name: 'http_request_duration_ms',
          help: 'Duração das requisições HTTP em ms',
          buckets: [50, 100, 200, 300, 500, 1000, 2000]
        }),
        httpErrorCount: new client.Counter({
          name: 'http_error_5xx_count',
          help: 'Quantidade de respostas 5xx'
        })
      };

      client.collectDefaultMetrics();
    }
  };
};
