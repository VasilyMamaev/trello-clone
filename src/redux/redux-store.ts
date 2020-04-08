import { combineReducers, createStore, applyMiddleware } from "redux";
import boardsReducer from "./board-reducer";
import thunkMiddleware from 'redux-thunk'


let rootReducer = combineReducers({
 boards: boardsReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
))


export default store