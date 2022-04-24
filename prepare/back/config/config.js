const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  "development": {
    "username": "scott",
    "password": process.env.DB_PASSWORD,
    "database": "task_agile",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "scott",
    "password": process.env.DB_PASSWORD,
    "database": "task_agile",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "scott",
    "password": process.env.DB_PASSWORD,
    "database": "task_agile",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
