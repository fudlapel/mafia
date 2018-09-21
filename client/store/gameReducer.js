import axios from 'axios'

//ACTION TYPES
const CREATE_GAME = 'CREATE_GAME'

//ACTION CREATORS
const creatingNewGame = game => ({type: CREATE_GAME, game})

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

//INITIAL STATE
const initialState = {}

//REDUCER
const gameReducer = (state = initialState, action) => {
  //console.log('action: ', action)
  switch (action.type) {
    case CREATE_GAME:
      return action.game
    default:
      return state
  }
}

export default gameReducer
