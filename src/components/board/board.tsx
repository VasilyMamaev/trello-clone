import React from 'react'
import { IList } from '../../types/types'
import ListCreator from './list/list-creator'
import List from './list/list'

type PropTypes = {
  boardId: number
  boardName: string
  lists: Array<IList>
  addNewList: (name: string, boardID: number, newListID: number) => void
  addNewTask: (name: string, boardID: number, listID: number, isDone: boolean) => void
}

const Board: React.FC<PropTypes> = (props) => {

  return (
    <div className="board">
      <div className="board-header">
        <div className="waves-effect waves-light btn">{props.boardName}</div>
      </div>
      <div className="board-grid">
        <div className="board-item">
          <ListCreator boardId={props.boardId} addNewList={props.addNewList} newListID={props.lists.length + 1}/>
        </div>
        {props.lists.map((item, i) => {
          return (
            <div className="board-item" key={item.id}>
              <List listInfo={props.lists[i]} addNewTask={props.addNewTask} boardId={props.boardId}/>
            </div>
          )
          })}
      </div>
      
    </div>
  )
}

export default Board
