const Sequelize = require('sequelize')
const db = require('../db')

const Player = db.define('player', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  gameId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  role: {
    type: Sequelize.ENUM('predator', 'prey'),
    defaultValue: 'prey'
  },
  status: {
    type: Sequelize.ENUM('alive', 'dead'),
    defaultValue: 'alive'
  }
})

module.exports = Player
