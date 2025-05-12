const winston = require(`winston`);

const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`),
  ),
  level: `warn`, // Adjusted level to reduce verbosity
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `logs/error.log`, level: `error` }),
    new winston.transports.File({ filename: `logs/combined.log` }),
  ],
});

module.exports = Logger;
