import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IBoard } from '../../types/types'

type PropsType = {
  boards: Array<IBoard>
  addNewBoard: (name: string) => void
}

const BoardsCollection: React.FC<PropsType> = (props) => {

  const [isOnEdit, setIsOnEdit] = useState<boolean>(false)
  const [newBoardTitle, setNewBoardTitle] = useState<string>('')

  const changeInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardTitle(evt.target.value)
  }
  const inputKeyPressHandler = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter') {
      props.addNewBoard(newBoardTitle)
      setIsOnEdit(false)
      setNewBoardTitle('')
    } 
  }
  const inputBlurHandler = () => {
    setIsOnEdit(false)
    setNewBoardTitle('')
  }

  return (
    <div className="row">
      { props.boards.map((item) => {
        return <div className="col s2" key={item.id}>
          <Link to={`/${item.id}`} className="waves-effect waves-light btn-large">{item.name}</Link>
        </div>
        
      })}
      <div className="col s2">
        {isOnEdit
          ? <div className="waves-effect waves-light btn-large">
            <input 
              autoFocus
              value={newBoardTitle}
              placeholder="input board's name"
              onChange={changeInputHandler}
              onKeyPress={inputKeyPressHandler}
              onBlur={inputBlurHandler}
            ></input>
          </div>
          : <div onClick={() => setIsOnEdit(true)} className="waves-effect waves-light btn-large red"><i className="material-icons right">add</i>new board</div>
        }
      </div>
    </div>
  
  )
}

export default BoardsCollection
