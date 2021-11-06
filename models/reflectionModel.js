const config = require('../config/connection')
const Sequelize = require('sequelize');

const model = {
  'id': {
    type: Sequelize.INTEGER,
    primaryKey: true,
    defaultValue: Sequelize.literal("nextval('reflection_id_seq')")
  },
  'success': Sequelize.STRING,
  'low_point': Sequelize.STRING,
  'take_away': Sequelize.STRING,
  'owner_id': Sequelize.INTEGER,
  'created_at': Sequelize.DATE,
  'updated_at': Sequelize.DATE,
};

module.exports = config.define('reflection', model, {
  //prevent sequelize transform table name into plural
  freezeTableName: true,
  timestamps: false
})