import io from 'socket.io-client'

//++++++++++++
//import playersReducer, {creatingNewPlayer} from './store/playersReducer'
import {addingNewPlayer} from './store/playersReducer'
import {changingGameStatus} from './store/gameReducer'
import {creatingNewRound, changingRoundStatus} from './store/roundReducer'
import store from './store'
//++++++++++++
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('I am now connected to the server!')

  //++++++++++++
  socket.on('new-player', player => {
    console.log('player in socket: ', player)
    store.dispatch(addingNewPlayer(player))
  })

  socket.on('game-status-change', game => {
    console.log('game in socket: ', game)
    store.dispatch(changingGameStatus(game))
  })

  socket.on('new-round', round => {
    console.log('round in socket: ', round)
    store.dispatch(creatingNewRound(round))
  })

  // socket.on('round-status-change', round => {
  //   console.log('round in socket: ', round)
  //   store.dispatch(changingRoundStatus(round))
  // })

  //++++++++++++
})

export default socket
