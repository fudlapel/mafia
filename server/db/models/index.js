const User = require('./user')
const Game = require('./game')
const Round = require('./round')
const Player = require('./player')
const Vote = require('./vote')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Game.hasMany(Round)
Round.belongsTo(Game)

Game.hasMany(Player)
Player.belongsTo(Game)

Round.belongsToMany(Player, {through: Vote})

module.exports = {
  User,
  Game,
  Round,
  Player,
  Vote
}
