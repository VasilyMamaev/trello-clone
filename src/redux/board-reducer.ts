import { IBoardsState, IListTask, IList } from './../types/types';
import { AppStateType } from './redux-store';

const ADD_NEW_BOARD = 'ADD_NEW_BOARD'
const ADD_NEW_LIST = 'ADD_NEW_LIST'
const ADD_NEW_TASK = 'ADD_NEW_TASK'
const TOGGLE_LISTS_TASK = 'TOGGLE_LISTS_TASK'
const MOVE_TASK = 'MOVE_TASK'

const initialState: IBoardsState = {
  boards: [
    {
      id: 1,
      name: 'First board',
      lists: [
        {
          id: 654165416,
          name: 'first list',
          tasks: [
            {
              id: 12262,
              taskName: 'todo reducer',
              isDone: false
            },
            {
              id: 21544687,
              taskName: 'drink juce',
              isDone: true
            }
          ]
        },
        {
          id: 451616,
          name: 'second list',
          tasks: [
            {
              id: 541641615,
              taskName: 'todo whatever',
              isDone: true
            },
            {
              id: 6541674165,
              taskName: 'drink juce',
              isDone: true
            }
          ]
        }
      ]
    }]
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

type ActionsType = AddNewBoardType | AddNewListType | AddNewTaskType | toggleListsTaskType | MoveTaskType

export default boardsReducer