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

let store = createStore(
  rootReducer,
  //@ts-ignore
  localStorage.getItem("redux-store") ? JSON.parse(localStorage.getItem("redux-store")) : {},
  composeEnhancers(applyMiddleware(thunkMiddleware))
  )

store.subscribe(() => {
  localStorage.setItem("redux-store", JSON.stringify(store.getState()))
})

export default store