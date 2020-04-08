import { IBoardsState } from './../types/types';

const ADD_NEW_BOARD = 'ADD_NEW_BOARD'
const ADD_NEW_LIST = 'ADD_NEW_LIST'


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

let boardsReducer = (state = initialState, action: any) => {
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
      let changedBoard = state.boards[action.boardID]
      changedBoard.lists.push(action.newList)
      return {
        ...state,
        boards: [
          changedBoard
        ]
      }
    default: 
      return state
  }
}

export const addNewBoardAC = (name: string) => {
  return {type: ADD_NEW_BOARD, name}
}

export const addNewListAC = (name: string, boardID: number, newListID: number) => {
  return {
    type: ADD_NEW_LIST,
    newList: {id: newListID, name, tasks:[]},
    boardID
  }
}

export default boardsReducer