import axios from 'axios'

//ACTION TYPES
const CREATE_PLAYER = 'CREATE_PLAYER'
const GET_ALL_PLAYERS = 'GET_ALL_PLAYERS'

//ACTION CREATORS
const creatingNewPlayer = player => ({type: CREATE_PLAYER, player})

const gettingAllPlayers = allPlayers => ({type: GET_ALL_PLAYERS, allPlayers})

//THUNK CREATOR
export const goCreatePlayer = (name, gameCode) => async dispatch => {
  try {
    const res = await axios.post('/api/players', {name, gameCode})
    const player = res.data
    if (player.name) {
      const action = creatingNewPlayer(player)
      dispatch(action)
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
        thisPlayer: action.player,
        allPlayers: [...state.allPlayers, action.player]
      }
    case GET_ALL_PLAYERS:
      return {
        ...state,
        allPlayers: action.allPlayers
      }
    default:
      return state
  }
}

export default playersReducer
