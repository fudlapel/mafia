//ACTION TYPES
const WRITE_NAME = 'WRITE_NAME'
const WRITE_CODE = 'WRITE_CODE'

//ACTION CREATORS
export const writeNewPlayerName = inputContent => ({
  type: WRITE_NAME,
  name: inputContent
})

export const writeNewPlayerCode = inputContent => ({
  type: WRITE_CODE,
  code: inputContent
})

//THUNK CREATORS
//-----none------

//INITIAL STATE
const initialState = {
  name: '',
  code: ''
}

//REDUCER
const newPlayerReducer = (state = initialState, action) => {
  //console.log('action: ', action)
  switch (action.type) {
    case WRITE_NAME:
      return {...state, name: action.name}
    case WRITE_CODE:
      return {...state, code: action.code}
    default:
      return state
  }
}

export default newPlayerReducer
