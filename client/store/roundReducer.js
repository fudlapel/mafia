import axios from 'axios'

//ACTION TYPES
const CREATE_ROUND = 'CREATE_ROUND'

//ACTION CREATORS
const creatingNewRound = round => ({type: CREATE_ROUND, round})

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

//INITIAL STATE
const initialState = {}

//REDUCER
const roundReducer = (state = initialState, action) => {
  //console.log('action: ', action)
  switch (action.type) {
    case CREATE_ROUND:
      return action.round
    default:
      return state
  }
}

export default roundReducer
