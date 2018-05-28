module.exports = {
  FRONTEND_URI: process.env.FRONTEND_URI || 'http://localhost:4200',
  SECRET:
    process.env.SECRET ||
    '',
  MONGO_URI:
    process.env.MONGO_URI ||
    (process.env.NODE_ENV === 'production'
      ? ''
      : 'mongodb://localhost:27017/express-seed-project'),
  MAILER: {
    from: '',
    auth: {
      api_key: '',
      domain: '',
    },
  },
};
