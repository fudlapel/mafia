import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import gameReducer from './gameReducer'
import playersReducer from './playersReducer'
import newPlayerReducer from './newPlayerReducer'
import roundReducer from './roundReducer'

const reducer = combineReducers({
  user,
  newPlayer: newPlayerReducer,
  game: gameReducer,
  players: playersReducer,
  round: roundReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
//--
export * from './gameReducer'
export * from './newPlayerReducer'
export * from './playersReducer'
export * from './roundReducer'
