import React, { useState } from 'react'
import { IList } from '../../../types/types'

type PropsType = {
  listInfo: IList
  boardId: number
  addNewTask: (name: string, boardID: number, listID: number) => void
  toggleTask: (boardID: number, listID: number, taskID: number, isDone: boolean) => void
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
          <ul >
            {props.listInfo.tasks.map((task) => {
              return (
                <li key={task.id}>
                  <button
                    draggable="true"
                    onDragStart={(evt) => startDragHandler(evt, task.id)}
                    onClick={() => toggleTaskHandler(task.id, task.isDone)}
                    className={task.isDone ? "waves-effect waves-light btn grey lighten-3 grey-text" : "waves-effect waves-light btn teal darken-3 "}
                  >
                    <i className="material-icons right">{task.isDone ? "check" : "bookmark"}</i>
                    {task.taskName}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="card-action">
          <button className="waves-effect waves-light btn" onClick={confirmInputHandler} >crate task</button>
          <button className="waves-effect waves-light btn red lighten-2" >delete list</button>
        </div>
      </div>
    </div>
  )
}

export default List
