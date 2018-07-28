import winston = require('winston');

export default winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ]
});
