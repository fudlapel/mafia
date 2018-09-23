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

//changes status of round to
//phase 2
//phase 3
//closed
router.put('/update/:roundId/:status', async (req, res, next) => {
  try {
    const id = req.params.roundId
    const status = req.params.status
    console.log(
      'gameId in update ROUND status route- id , status: ',
      id,
      status
    )

    await Round.update(
      {
        status
      },
      {
        where: {id}
      }
    )
    const updatedRound = await Round.findById(id)
    console.log('updatedRound: ', updatedRound)
    res.json(updatedRound)
  } catch (err) {
    next(err)
  }
})
