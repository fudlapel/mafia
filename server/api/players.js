const router = require('express').Router()
const {Player, Game} = require('../db/models')
module.exports = router

//fetches all players from game
router.get('/:gameId', async (req, res, next) => {
  try {
    const gameId = req.params.gameId
    const players = await Player.findAll({where: {gameId}})
    //console.log('players in route: ', players)
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
    }
    //need error message if player cant join because game is closed
  } catch (err) {
    next(err)
  }
})

//assign predator roles for players
router.put('/roles/:gameId', async (req, res, next) => {

  //returns a random number between min (inclusive) and max (exclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  try {
    const gameId = req.params.gameId
    const players = await Player.findAll({where: {gameId}})
    //console.log('players to assign in routes: ', players)

    //RULES FOR # OF PREDATORS: 1 predator for every 1-5 prey
    //1-5 prey, 1 pred ~~ 6-10 prey, 2 pred ~~ 11-15 prey, 3 pred, etc

    const numOfPredators = Math.ceil(players.length / 5)
    //console.log('numOfPredators: ', numOfPredators)

    let predatorIndices = []
    while (predatorIndices.length < numOfPredators) {
      let index = getRandomInt(0, players.length)
      if (predatorIndices.indexOf(index) === -1) {
        predatorIndices.push(index)
      }
    }
    console.log('OUT OF LOOP predatorIndices: ', predatorIndices)

    let predatorIds = predatorIndices.map(index => players[index].id)
    console.log('predatorIds: ', predatorIds)

    const update = async function(idArr, fieldToCHange, valueToChange) {
      arr.forEach(function(id){
        await Player.update({fieldToCHange: valueToChange}, {where: {id}})
      })
    }
    console.log('update done: ', update)

    const updatedPlayers = await Player.findAll({where: {gameId}})
    console.log('updatedPlayers: ', updatedPlayers)
    res.json(updatedPlayers)
  } catch (err) {
    next(err)
  }
})
