import React, { useState } from 'react'

type PropsType = {
  newListID: number
  boardId: number
  addNewList: (name: string, boardID: number, newListID: number) => void
}

const ListCreator= (props: PropsType) => {

  const [inputState, setInputState] = useState('')

  const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(evt.target.value)
  }

  const buttonClickHandler = ( ) => {
    props.addNewList(inputState, props.boardId, props.newListID)
    setInputState('')
  }

  return (
    <div className="card green lighten-5">
      <div className="card-content black-text">
        <span className="card-title">enter list title</span>
        <input onChange={inputChangeHandler} value={inputState}></input>
      </div>
      <div className="card-action">
        <button onClick={buttonClickHandler} className="waves-effect waves-light  btn">create list</button>
      </div>
    </div>
  )
}

export default ListCreator
