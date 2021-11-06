const config = require('../config/connection')
const Sequelize = require('sequelize');

const model = {
  'id': {
    type: Sequelize.INTEGER,
    primaryKey: true,
    defaultValue: Sequelize.literal("nextval('id_users_sequence')")
  },
  'nama': Sequelize.STRING,
  'email': Sequelize.STRING,
  'password': Sequelize.STRING,
  'akses_token': Sequelize.STRING,
  'created_at': Sequelize.DATE,
  'updated_at': Sequelize.DATE,
};

module.exports = config.define('users', model, {
  //prevent sequelize transform table name into plural
  freezeTableName: true,
  timestamps: false
})