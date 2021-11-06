const Sequelize = require('sequelize');
const sequelize = new Sequelize('fp1', 'postgres', 'postgres', {
  host: '127.0.0.1',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
try {
  sequelize.authenticate();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
module.exports = sequelize