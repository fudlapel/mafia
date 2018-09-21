const Sequelize = require('sequelize')
const db = require('../db')

const Vote = db.define('vote', {
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  roundId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  chosenPlayerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  voteType: {
    type: Sequelize.ENUM('kill', 'guess'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Vote
