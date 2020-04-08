import { IBoardsCollection } from './../types/types';

const ADD_NEW_BOARD = 'ADD_NEW_BOARD'


const initialState: IBoardsCollection = [
  {
    id: 1,
    name: 'test roard',
    lists: [{
      id: 1,
      name: 'list 1',
      tasks: [{
        id: 1,
        isDone: true,
        taskName: 'first task'
      },{
        id: 2,
        isDone: false,
        taskName: 'not first task'
      },{
        id: 3,
        isDone: false,
        taskName: 'not first task'
      }]
    }]
  }, {
    id: 2,
    name: 'test roard',
    lists: [{
      id: 1,
      name: 'list 1',
      tasks: [{
        id: 1,
        isDone: true,
        taskName: 'first task'
      },{
        id: 2,
        isDone: false,
        taskName: 'not first task'
      },{
        id: 3,
        isDone: false,
        taskName: 'not first task'
      }]
    }]
  }
]

let boardsReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case 'ADD_NEW_BOARD':
      return [
        ...state,
        {
          id: state.length + 1,
          name: action.name,
          lists: []
        }
      ]
    default: 
      return state
  }
}

export const addNewBoardAC = (name: string) => {
  return {type: ADD_NEW_BOARD, name}
}

export default boardsReducer