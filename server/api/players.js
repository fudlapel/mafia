const router = require('express').Router()
const {Player, Game} = require('../db/models')
module.exports = router

//fetches all players from game
router.get('/:gameId', async (req, res, next) => {
  try {
    const gameId = req.params.gameId
    const players = await Player.findAll({where: {gameId}})
    console.log('players in route: ', players)
    res.json(players)
  } catch (err) {
    next(err)
  }
})

//create a new player
router.post('/', async (req, res, next) => {
  try {
    const name = req.body.name
    const gameCode = req.body.gameCode
    const joinGame = await Game.findOne({
      where: {gameCode}
    })
    if (joinGame.status === 'new') {
      const gameId = joinGame.id
      const newPlayer = await Player.create({name, gameId, role: 'prey'})
      res.json(newPlayer)
    } else {
      res.json({})
    }
  } catch (err) {
    next(err)
  }
})
