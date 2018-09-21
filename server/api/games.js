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

//start a new game
router.post('/', async (req, res, next) => {
  try {
    const newGame = await Game.create()
    res.json(newGame)
  } catch (err) {
    next(err)
  }
})
