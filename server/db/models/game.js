const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  gameCode: {
    type: Sequelize.STRING,
    defaultValue: function() {
      var code = ''
      var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < 5; i++)
        code += possible.charAt(Math.floor(Math.random() * possible.length))
      return code
    }
  },
  status: {
    type: Sequelize.ENUM('new', 'in play', 'over'),
    defaultValue: 'new'
  }
})

module.exports = Game
