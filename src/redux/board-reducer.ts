import { IBoardsState, IListTask, IList } from './../types/types';

const ADD_NEW_BOARD = 'ADD_NEW_BOARD'
const ADD_NEW_LIST = 'ADD_NEW_LIST'
const ADD_NEW_TASK = 'ADD_NEW_TASK'

const initialState: IBoardsState = {
  boards: [
    {
      id: 1,
      name: 'First board',
      lists: [
        {
          id: 1,
          name: 'first list',
          tasks: [
            {
              id: 1,
              taskName: 'todo reducer',
              isDone: false
            },
            {
              id: 2,
              taskName: 'drink juce',
              isDone: true
            }
          ]
        },
        {
          id: 2,
          name: 'second list',
          tasks: [
            {
              id: 1,
              taskName: 'todo whatever',
              isDone: true
            },
            {
              id: 2,
              taskName: 'drink juce',
              isDone: true
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Second board',
      lists: [
        {
          id: 1,
          name: 'first list',
          tasks: [
            {
              id: 1,
              taskName: 'todo reducer',
              isDone: false
            },
            {
              id: 2,
              taskName: 'drink juce',
              isDone: true
            }
          ]
        }
      ]
    }
  ]
}

let boardsReducer = (state = initialState, action: ActionsType) => {
  switch(action.type) {
    case 'ADD_NEW_BOARD':
      return {
        ...state,
        boards: [
          ...state.boards,
        {
          id: state.boards.length + 1,
          name: action.name,
          lists: []
        }
      ]}
    case 'ADD_NEW_LIST':
      let newBoards = state.boards
      newBoards[action.boardID].lists.push(action.newList)
      return {
        ...state,
       boards: [...newBoards]
      }
    case 'ADD_NEW_TASK':
      return {
        ...state,
        boards: [...state.boards.map((item,i) => {
          if (i === action.boardID) {
            item.lists.map((item,i) => {
              if (i === action.listID - 1) {
                item.tasks.push(action.newTask)
              }
              return item
            })
            return item
          }
          return item
        })]
      }
    default: 
      return state
  }
}


type AddNewBoardType = {
  type: typeof ADD_NEW_BOARD
  name: string
}
export const addNewBoardAC = (name: string): AddNewBoardType => {
  return {type: ADD_NEW_BOARD, name}
}

type AddNewListType = {
  type: typeof ADD_NEW_LIST
  newList: IList
  boardID: number
}
export const addNewListAC = (name: string, boardID: number, newListID: number): AddNewListType => {
  return {
    type: ADD_NEW_LIST,
    newList: {id: newListID, name, tasks:[]},
    boardID
  }
}

type AddNewTaskType = {
  type: typeof ADD_NEW_TASK
  boardID: number
  listID: number
  newTask: IListTask
}
export const addNewTaskAC = (name: string, boardID: number, listID: number, isDone: boolean = false): AddNewTaskType => {
  return {
    type: ADD_NEW_TASK,
    boardID,
    listID,
    newTask: {
      id: Date.now(),
      taskName: name,
      isDone
    }
  }
}

type ActionsType = AddNewBoardType | AddNewListType | AddNewTaskType

export default boardsReducer