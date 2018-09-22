const router = require('express').Router()
const {Round} = require('../db/models')
module.exports = router

//create a new round
router.post('/', async (req, res, next) => {
  try {
    const gameId = req.body.gameId
    const currentRound = req.body.currentRound

    let roundType = 'kill'
    if (currentRound) {
      if (currentRound.roundType === 'kill') {
        roundType = 'guess'
      }
    }

    const round = await Round.create({gameId, roundType})
    console.log('NEW ROUND: ', round)

    res.json(round)
  } catch (err) {
    next(err)
  }
})
