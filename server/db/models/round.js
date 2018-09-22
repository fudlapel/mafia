const Sequelize = require('sequelize')
const db = require('../db')

const Round = db.define('round', {
  gameId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  chosenPlayerId: {
    type: Sequelize.INTEGER
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  roundType: {
    type: Sequelize.ENUM('kill', 'guess'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.ENUM('phase 1', 'phase 2', 'phase 3', 'closed'),
    defaultValue: 'phase 1'
  }
})

module.exports = Round
