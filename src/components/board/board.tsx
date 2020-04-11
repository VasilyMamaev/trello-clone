import React from 'react'
import { IList } from '../../types/types'
import ListCreator from './list/list-creator'
import List from './list/list'

type PropTypes = {
  boardId: number
  boardName: string
  lists: Array<IList>
  addNewList: (name: string, boardID: number, newListID: number) => void
  addNewTask: (name: string, boardID: number, listID: number) => void
  toggleTask: (boardID: number, listID: number, taskID: number, isDone: boolean) => void
  moveTask: (taskId: number, forsakenListId: number, newListId: number, boardId: number) => void
}

const Board: React.FC<PropTypes> = (props) => {

  const dropHandler = (evt: React.DragEvent, listId: number) => {
      evt.preventDefault()

      const [recivedTask, recivedList] = evt.dataTransfer.getData('taskId,listId').split(',')
      
      props.moveTask(Number(recivedTask), Number(recivedList), listId, props.boardId)
  }

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
            <div onDrop={(evt) => dropHandler(evt, item.id)} onDragOver={(evt) => evt.preventDefault()} className="board-item" key={item.id}>
              <List 
                listInfo={props.lists[i]}
                addNewTask={props.addNewTask}
                boardId={props.boardId}
                toggleTask={props.toggleTask}
              />
            </div>
          )
          })}
      </div>
      
    </div>
  )
}

export default Board
