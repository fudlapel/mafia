import axios from 'axios'
//++++++++++++
import socket from '../socket'
//++++++++++++

//ACTION TYPES
const CREATE_GAME = 'CREATE_GAME'
const FETCH_GAME = 'FETCH_GAME'
const START_GAME = 'START_GAME'
const CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS'

//ACTION CREATORS
const creatingNewGame = game => ({type: CREATE_GAME, game})
const fetchingGame = game => ({type: FETCH_GAME, game})
const startingGame = game => ({type: START_GAME, game})
export const changingGameStatus = game => ({type: CHANGE_GAME_STATUS, game})

//THUNK CREATOR
export const goCreateNewGame = () => async dispatch => {
  try {
    const res = await axios.post('/api/games')
    const game = res.data
    const action = creatingNewGame(game)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const goFetchGame = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/games/${gameId}`)
    const game = res.data
    const action = fetchingGame(game)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const startGame = gameId => async dispatch => {
  try {
    //console.log('gameId in games reducer: ', gameId)
    const res = await axios.put(`/api/games/play/${gameId}`)
    const game = res.data
    const action = startingGame(game)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const updateGameStatus = (gameId, status) => async dispatch => {
  try {
    const res = await axios.put(`/api/games/update/${gameId}/${status}`)
    const game = res.data
    const action = changingGameStatus(game)
    dispatch(action)
    socket.emit('game-status-change', game)
  } catch (err) {
    console.error(err)
  }
}

//INITIAL STATE
const initialState = {}

//REDUCER
const gameReducer = (state = initialState, action) => {
  //console.log('action: ', action)
  switch (action.type) {
    case CREATE_GAME:
      return action.game
    case FETCH_GAME:
      return action.game
    case START_GAME:
      return action.game
    case CHANGE_GAME_STATUS:
      return action.game
    default:
      return state
  }
}

export default gameReducer
