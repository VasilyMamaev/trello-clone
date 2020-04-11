import React, { useState } from 'react'
import { IList } from '../../../types/types'

type PropsType = {
  listInfo: IList
  boardId: number
  addNewTask: (name: string, boardID: number, listID: number) => void
  toggleTask: (boardID: number, listID: number, taskID: number, isDone: boolean) => void
  deleteTask: (boardId: number, listId: number, taskId: number) => void
  deleteList: (boardId: number, listId: number) => void
}

const List = (props: PropsType) => {

  const [inputState,setInputState] = useState('')

  const changeInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value)
  }

  const confirmInputHandler = () => {
      props.addNewTask(inputState, props.boardId, props.listInfo.id)
      setInputState('')
  }

  const confirmInputKeyHandler = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      confirmInputHandler()
    }
  }

  const toggleTaskHandler = (taskID: number, isDone: boolean) => {
    props.toggleTask(props.boardId, props.listInfo.id, taskID, isDone)
  }

  const startDragHandler = (evt: React.DragEvent, id: number) => {
    evt.dataTransfer.setData('taskId,listId', `${id},${props.listInfo.id}`)
  }


  return (
    <div className="board-item" >
      <div className="card blue-grey lighten-5">
        <div className="card-content black-text">
          <span className="card-title">{props.listInfo.name}</span>
          <input 
            maxLength={20}
            value={inputState}
            onChange={changeInputHandler}
            onKeyPress={confirmInputKeyHandler}
            placeholder="text new task"
          ></input>
          <p>tasks:</p>
          <ul className="collection">
            {props.listInfo.tasks.map((task) => {
              return (
                <li key={task.id} className={task.isDone ? "collection-item grey lighten-3 grey-text"
                  : "collection-item teal darken-1 white-text"}>
                  <div
                    draggable="true"
                    onDragStart={(evt) => startDragHandler(evt, task.id)}
                    onClick={() => toggleTaskHandler(task.id, task.isDone)}
                    className="task"
                  >
                    <i className="material-icons">{task.isDone ? "check" : "bookmark"}</i>
                    {task.taskName}
                    <i 
                      className={`material-icons ${task.isDone? 'red-text' : 'black-text'}`}
                      onClick={() => props.deleteTask(props.boardId, props.listInfo.id, task.id)}
                    >clear</i>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="card-action">
          <button className="waves-effect waves-light btn" onClick={confirmInputHandler} >crate task</button>
          <button 
            className="waves-effect waves-light btn red lighten-2"
            onClick={() => props.deleteList(props.boardId, props.listInfo.id)}
          >delete list</button>
        </div>
      </div>
    </div>
  )
}

export default List
