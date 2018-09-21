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
    type: Sequelize.ENUM('open', 'closed'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Round
