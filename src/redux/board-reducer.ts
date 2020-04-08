import { IBoard } from "../types/types"


export type IBoardsCollection = Array<IBoard>

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
    default: 
      return state
  }
}

export default boardsReducer