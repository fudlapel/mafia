import axios from 'axios'
//++++++++++++
import socket from '../socket'
//++++++++++++

//ACTION TYPES
const CREATE_PLAYER = 'CREATE_PLAYER'
const GET_ALL_PLAYERS = 'GET_ALL_PLAYERS'
const ASSIGN_ROLES = 'ASSIGN_ROLES'
const KILL_PREY = 'KILL_PREY'

const ADDING_NEW_PLAYER = 'ADDING_NEW_PLAYER'

//ACTION CREATORS
const creatingNewPlayer = player => ({type: CREATE_PLAYER, player})

const gettingAllPlayers = allPlayers => ({type: GET_ALL_PLAYERS, allPlayers})

const assigningPlayerRoles = updatedPlayers => ({
  type: ASSIGN_ROLES,
  updatedPlayers
})

const killingPrey = updatedPlayers => ({
  type: KILL_PREY,
  updatedPlayers
})

export const addingNewPlayer = player => ({type: ADDING_NEW_PLAYER, player})

//THUNK CREATOR
export const goCreatePlayer = (name, gameCode) => async dispatch => {
  try {
    const res = await axios.post('/api/players', {name, gameCode})
    const player = res.data
    if (player.name) {
      const action = creatingNewPlayer(player)
      dispatch(action)
      dispatch(addingNewPlayer(player))
      socket.emit('new-player', player)
    }
    //else {
    //error that the game the player is attempting to join is already in lay
    //}
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllPlayers = gameId => async dispatch => {
  try {
    const res = await axios.get(`/api/players/${gameId}`)
    const allPlayers = res.data
    const action = gettingAllPlayers(allPlayers)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const randomlyAssignRoles = gameId => async dispatch => {
  try {
    const res = await axios.put(`/api/players/roles/${gameId}`)
    const updatedPlayers = res.data
    console.log('updatedPlayers: ', updatedPlayers)
    const action = assigningPlayerRoles(updatedPlayers)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const killPrey = (playerId, gameId) => async dispatch => {
  try {
    const res = await axios.put(`/api/players/kill/${playerId}/${gameId}`)
    const updatedPlayers = res.data
    console.log('updatedPlayers: ', updatedPlayers)
    const action = killingPrey(updatedPlayers)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

//INITIAL STATE
const initialState = {
  thisPlayer: {},
  allPlayers: []
}

//REDUCER
const playersReducer = (state = initialState, action) => {
  //console.log('action: ', action)
  switch (action.type) {
    case CREATE_PLAYER:
      return {
        ...state,
        thisPlayer: action.player
      }
    case GET_ALL_PLAYERS:
      return {
        ...state,
        allPlayers: action.allPlayers
      }
    case ASSIGN_ROLES:
      return {
        ...state,
        thisPlayer: action.updatedPlayers.filter(
          player => player.id === state.thisPlayer.id
        )[0],
        allPlayers: action.updatedPlayers
      }
    case KILL_PREY:
      return {
        ...state,
        thisPlayer: action.updatedPlayers.filter(
          player => player.id === state.thisPlayer.id
        )[0],
        allPlayers: action.updatedPlayers
      }
    case ADDING_NEW_PLAYER:
      return {...state, allPlayers: [...state.allPlayers, action.player]}
    default:
      return state
  }
}

export default playersReducer
