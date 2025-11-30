module.exports = async function (req, res, proceed) {
  const start = Date.now();

  const correlationId = req.headers['x-correlation-id'] || require('uuid').v4();
  req.correlationId = correlationId;

  res.on('finish', () => {
    const duration = Date.now() - start;
    global.metrics.httpRequestDuration.observe(duration);

    sails.log.info(
      JSON.stringify({
        type: 'request',
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration_ms: duration,
        correlationId,
        timestamp: new Date().toISOString()
      })
    );
  });

  return proceed();
};
