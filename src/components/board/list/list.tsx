import React, { useState } from 'react'
import { IList } from '../../../types/types'

type PropsType = {
  listInfo: IList
  boardId: number
  addNewTask: (name: string, boardID: number, listID: number, isDone: boolean) => void
}

const List = (props: PropsType) => {

  const [inputState,setInputState] = useState('')

  const changeInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value)
  }

  const confirmInputHandler = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      props.addNewTask(inputState, props.boardId, props.listInfo.id, false)
      setInputState('')
    }
  }

  return (
    <div className="board-item" >
      <div className="card blue-grey lighten-5">
        <div className="card-content black-text">
          <span className="card-title">{props.listInfo.name}</span>
          <p>tasks:</p>
          <input 
            value={inputState}
            onChange={changeInputHandler}
            onKeyPress={confirmInputHandler}
            placeholder="text new task"
          ></input>
          <ul>

          </ul>
          {props.listInfo.tasks.map((task) => {
            return <li key={task.id}>
              {task.isDone
               ? <button className="waves-effect waves-light btn green lighten-3 black-text"><i className="material-icons right">check</i>{task.taskName}</button>
               : <button className="waves-effect waves-light btn blue lighten-3 black-text"><i className="material-icons right">bookmark</i>{task.taskName}</button>
              }
            </li>
          })}
        </div>
        <div className="card-action">
          <b >delete list</b>
        </div>
      </div>
    </div>
  )
}

export default List
