import axios from 'axios'

//ACTION TYPES
const CREATE_ROUND = 'CREATE_ROUND'
const CHANGE_ROUND_STATUS = 'CHANGE_ROUND_STATUS'

//ACTION CREATORS
const creatingNewRound = round => ({type: CREATE_ROUND, round})
const changingRoundStatus = updatedRound => ({
  type: CHANGE_ROUND_STATUS,
  updatedRound
})

//THUNK CREATOR
export const goCreateRound = (gameId, currentRound) => async dispatch => {
  try {
    const res = await axios.post('/api/rounds', {gameId, currentRound})
    const round = res.data
    const action = creatingNewRound(round)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const updatingRound = (roundId, status, playerId) => async dispatch => {
  try {
    let bodyObj = {status}
    if (playerId) {
      bodyObj.playerId = playerId
    }
    console.log('bodyObj: ', bodyObj)
    const res = await axios.put(`/api/rounds/update/${roundId}`, bodyObj)
    const round = res.data
    const action = changingRoundStatus(round)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

//INITIAL STATE
const initialState = {}

//REDUCER
const roundReducer = (state = initialState, action) => {
  //console.log('action: ', action)
  switch (action.type) {
    case CREATE_ROUND:
      return action.round
    case CHANGE_ROUND_STATUS:
      return action.updatedRound
    default:
      return state
  }
}

export default roundReducer
