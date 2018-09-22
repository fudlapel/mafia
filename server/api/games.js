const router = require('express').Router()
const {Game} = require('../db/models')
module.exports = router

//fetches all games from the database
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll({})
    res.json(games)
  } catch (err) {
    next(err)
  }
})

//fetches specific game from the database
router.get('/:gameId', async (req, res, next) => {
  try {
    const id = req.params.gameId
    console.log('gameId: ', id)
    const game = await Game.findById(id)
    console.log('game in route: ', game)
    res.json(game)
  } catch (err) {
    next(err)
  }
})

//start a new game
router.post('/', async (req, res, next) => {
  try {
    const newGame = await Game.create()
    res.json(newGame)
  } catch (err) {
    next(err)
  }
})

//changes status of game to
//--'in play'
router.put('/play/:gameId', async (req, res, next) => {
  try {
    const id = req.params.gameId
    //console.log('gameId in games routes: ', id)

    await Game.update(
      {
        status: 'in play'
      },
      {
        where: {id}
      }
    )
    const updatedGame = await Game.findById(id)
    console.log('updatedgame: ', updatedGame)

    res.json(updatedGame)
  } catch (err) {
    next(err)
  }
})

//changes status of game to
//--'roles assigned',
//--'start round',
//--'in round',
//--'round over',
//--'game over',
router.put('/update/:gameId/:status', async (req, res, next) => {
  try {
    const id = req.params.gameId
    const status = req.params.status
    console.log('gameId in update game status route- id , status: ', id, status)

    await Game.update(
      {
        status
      },
      {
        where: {id}
      }
    )
    const updatedGame = await Game.findById(id)
    console.log('updatedgame: ', updatedGame)
    res.json(updatedGame)
  } catch (err) {
    next(err)
  }
})
