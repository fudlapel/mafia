const router = require('express').Router()
const {Player, Game} = require('../db/models')
module.exports = router

//fetches all players from game
router.get('/:gameId', async (req, res, next) => {
  try {
    const gameId = req.params.gameId
    const players = await Player.findAll({where: {gameId}})
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

    const test = players.filter(player => player.role === 'predator').length

    //RULES FOR # OF PREDATORS: 1 predator for every 1-5 prey
    //1-5 prey, 1 pred ~~ 6-10 prey, 2 pred ~~ 11-15 prey, 3 pred, etc
    if (!test) {
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

      for (let i = 0; i < predatorIds.length; i++) {
        await Player.update({role: 'predator'}, {where: {id: predatorIds[i]}})
      }

      const updatedPlayers = await Player.findAll({where: {gameId}})
      console.log('updatedPlayers: ', updatedPlayers)
      res.json(updatedPlayers)
    } else {
      res.json(players)
    }
  } catch (err) {
    next(err)
  }
})

//kill prey
router.put('/kill/:playerId/:gameId', async (req, res, next) => {
  try {
    const id = req.params.playerId
    const gameId = req.params.gameId
    const deadPlayer = await Player.update({status: 'dead'}, {where: {id}})
    console.log('deadPlayer in kill prey route: ', deadPlayer)

    const updatedPlayers = await Player.findAll({where: {gameId}})
    console.log('updatedPlayers in kill prey route: ', updatedPlayers)

    res.json(updatedPlayers)
  } catch (err) {
    next(err)
  }
})
