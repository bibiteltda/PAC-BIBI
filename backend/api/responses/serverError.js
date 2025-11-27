module.exports = function serverError(data) {
  const req = this.req;
  const res = this.res;

  sails.log.error(
    JSON.stringify({
      type: 'error',
      correlationId: req.correlationId,
      message: data && data.message,
      stack: data && data.stack,
      url: req.url,
      timestamp: new Date().toISOString()
    })
  );

  global.metrics.httpErrorCount.inc();
  return res.status(500).send({
    error: 'Internal Server Error',
    correlationId: req.correlationId
  });
};
