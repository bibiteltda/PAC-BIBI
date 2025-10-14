module.exports = {
  models: {
    migrate: 'alter'
  },

  datastores: {
    default: {
      adapter: 'sails-postgresql',
      url: process.env.DATABASE_URL
    }
  },

  sockets: {
    onlyAllowOrigins: [
      'https://bibiescolar.vercel.app',
      'http://localhost:5173'
    ]
  },

  security: {
    cors: {
      allRoutes: true,
      allowOrigins: [
        'https://bibiescolar.vercel.app',
        'http://localhost:5173'
      ],
      allowCredentials: true,
      allowRequestMethods: 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
      allowRequestHeaders: 'Content-Type, Authorization'
    }
  },

  http: { trustProxy: true },
  session: { cookie: { secure: true } }
};
