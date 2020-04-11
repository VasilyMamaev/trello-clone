import { IBoardsState, IListTask, IList } from './../types/types';

const ADD_NEW_BOARD = 'ADD_NEW_BOARD'
const ADD_NEW_LIST = 'ADD_NEW_LIST'
const ADD_NEW_TASK = 'ADD_NEW_TASK'
const TOGGLE_LISTS_TASK = 'TOGGLE_LISTS_TASK'
const MOVE_TASK = 'MOVE_TASK'
const DELETE_BOARD = 'DELETE_BOARD'
const DELETE_LIST = 'DELETE_LIST'
const DELETE_TASK = 'DELETE_TASK'

const initialState: IBoardsState =  {
  boards: []
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
        boards: [...state.boards.map((item, i) => {
          if (item.id - 1 === action.boardID) {
            item.lists.map((item, i) => {
              if (item.id === action.listID) {
                item.tasks.push(action.newTask)
              }
              return item
            })
            return item
          }
          return item
        })]
      }
    case 'TOGGLE_LISTS_TASK':
      return {
        ...state,
        boards: [
          ...state.boards.map((item) => {
          if (item.id - 1 === action.boardID) {
            item.lists.map((item) => {
              if (item.id === action.listID) {
                item.tasks.map((item) => {
                  if (item.id === action.taskID) {
                    item.isDone = !item.isDone
                  }
                  return item
                })
              }
              return item
            })
          }
          return item
        })
        ]
      }
    case 'MOVE_TASK':
      let board = state.boards[action.boardId]
      let task = {
        ...board.lists.find(item => item.id === action.forsakenListId)?.tasks.find(item => item.id === action.taskId)
      }

      const sortedNewList = board.lists.find(item => item.id === action.newListId)?.tasks
      // @ts-ignore
      const newList = [...sortedNewList, task]

      const sortedForsakenList = board.lists.find(item => item.id === action.forsakenListId)?.tasks
      // @ts-ignore
      const forsakenList = [...sortedForsakenList.filter( item => item.id !== action.taskId)]

      return {
        ...state,
        boards: [
          ...state.boards.map((item) => {
            if (item.id - 1 === action.boardId) {
              item.lists.map((item) => {
                if (item.id === action.newListId) {
                  return item.tasks = newList
                } else 
                if (item.id === action.forsakenListId) {
                  return item.tasks = forsakenList
                } else return item
              })
            }
            return item
          })
        ]
      }
    case 'DELETE_BOARD':
      return {
        ...state,
        boards: [
          ...state.boards.filter(item => item.id - 1 !== action.boardId)
        ]
      }      
    case 'DELETE_LIST':
      return {
        ...state,
        boards: [
          ...state.boards.map((item) => {
          if (item.id - 1 === action.boardId) {
            item.lists = item.lists.filter(item => item.id !== action.listId)
          }
          return item
        })
        ]
      }
    case 'DELETE_TASK':
      return {
          ...state,
          boards: [
            ...state.boards.map((item) => {
            if (item.id - 1 === action.boardId) {
              item.lists.map((item) => {
                if (item.id === action.listId) {
                  item.tasks = item.tasks.filter(item => item.id !== action.taskId)
                }
                return item
              })
            }
            return item
          })
          ]
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
    newList: {id: Date.now(), name, tasks:[]},
    boardID
  }
}

type AddNewTaskType = {
  type: typeof ADD_NEW_TASK
  boardID: number
  listID: number
  newTask: IListTask
}
export const addNewTaskAC = (name: string, boardID: number, listID: number): AddNewTaskType => {
  return {
    type: ADD_NEW_TASK,
    boardID,
    listID,
    newTask: {
      id: Date.now(),
      taskName: name,
      isDone: false
    }
  }
}

type toggleListsTaskType = {type: typeof TOGGLE_LISTS_TASK, boardID: number, listID: number, taskID: number, isDone: boolean}
export const toggleListsTaskAC = (boardID: number, listID: number, taskID: number, isDone: boolean): toggleListsTaskType => {
  return {
    type: TOGGLE_LISTS_TASK,
    boardID,
    listID,
    taskID,
    isDone
  }
}

type MoveTaskType = {type: typeof MOVE_TASK, taskId: number, forsakenListId: number, newListId: number, boardId: number}
export const moveTaskAC = (taskId: number, forsakenListId: number, newListId: number, boardId: number): MoveTaskType => {
  return{
    type: MOVE_TASK,
    taskId,
    forsakenListId,
    newListId,
    boardId
  }
}

type DeleteBoardType = {type: typeof DELETE_BOARD, boardId: number}
export const deleteBoardAC = (boardId: number): DeleteBoardType => {
  return {
    type: DELETE_BOARD,
    boardId
  }
} 

type DeleteListType = {type: typeof DELETE_LIST, boardId: number, listId: number}
export const deleteListAC = (boardId: number, listId: number): DeleteListType => {
  return {
    type: DELETE_LIST,
    boardId,
    listId,
  }
} 

type DeleteTaskType = {type: typeof DELETE_TASK, boardId: number, listId: number, taskId: number}
export const deleteTaskAC = (boardId: number, listId: number, taskId: number): DeleteTaskType => {
  return {
    type: DELETE_TASK,
    boardId,
    listId,
    taskId
  }
}

type ActionsType = AddNewBoardType | AddNewListType | AddNewTaskType | toggleListsTaskType |
  MoveTaskType | DeleteBoardType | DeleteListType | DeleteTaskType

export default boardsReducer