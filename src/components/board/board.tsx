import React from 'react'
import { IList } from '../../types/types'
import ListCreator from './list/list-creator'

type PropTypes = {
  boardId: number
  boardName: string
  lists: Array<IList>
  addNewList: (name: string, boardID: number, newListID: number) => void
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
        { props.lists.map((item) => {
          return (
            <div className="board-item" key={item.id + item.name}>
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">{item.name}</span>
          <p>{item.id}</p>
                </div>
                <div className="card-action">
                  <b >This is a link</b>
                  <b >This is a link</b>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default Board
