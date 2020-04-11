import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IBoard } from '../../types/types'

type PropsType = {
  boards: Array<IBoard>
  addNewBoard: (name: string) => void
  deleteBoard: (boardId: number) => void
}

const BoardsCollection: React.FC<PropsType> = (props) => {

  const [isOnEdit, setIsOnEdit] = useState<boolean>(false)
  const [newBoardTitle, setNewBoardTitle] = useState<string>('')

  const changeInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardTitle(evt.target.value)
  }

  const confirmInputHandler = () => {
      props.addNewBoard(newBoardTitle)
      setIsOnEdit(false)
      setNewBoardTitle('')
  }

  const inputKeyPressHandler = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      confirmInputHandler()
    } 
  }

  const inputBlurHandler = () => {
    setTimeout(() => {
      setIsOnEdit(false)
      setNewBoardTitle('')
    }, 400)
  }

  return (
    <div className="row boards-wrapper">
      { props.boards.map((item) => {
        return (
          <div key={item.id} className="boards card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{item.name}</span>
            </div>
            <div className="card-action boars-buttons">
              <Link to={`/${item.id}`} className="waves-effect waves-light btn">open</Link>
              <button 
                className="waves-effect waves-light btn red lighten-2"
                onClick={() => props.deleteBoard(item.id)}
              >delete</button>
            </div>
          </div>
        )
      })}
      {isOnEdit
        ? <div className="boards card green lighten-5">
            <div className="card-content black-text">
              <p>enter board name</p>
              <input 
                autoFocus
                value={newBoardTitle}
                onChange={changeInputHandler}
                onKeyPress={inputKeyPressHandler}
                onBlur={inputBlurHandler}
              ></input>
            </div>
            <div className="card-action">
              <button onClick={confirmInputHandler} className="waves-effect waves-light btn red lighten-2" >create board</button>
            </div>
          </div>
        : <div onClick={() => setIsOnEdit(true)} className="boards waves-effect waves-light btn-large red lighten-2">
            <i className="material-icons right">add</i>
            new board
          </div>
      }
      
    </div>
  
  )
}

export default BoardsCollection
