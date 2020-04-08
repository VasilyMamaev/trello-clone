import React from 'react'
import { Link } from 'react-router-dom'
import { IBoard } from '../../types/types'

type PropsType = {
  boards: Array<IBoard>
}

const BoardsCollection: React.FC<PropsType> = (props) => {
  return (
    <div className="row">
      { props.boards.map((item) => {
        return <Link key={item.id} to='/' className="waves-effect waves-light btn col s2">{item.name}</Link>
      })}
      <div className="col s2">
        <button className="waves-effect waves-light btn col s2 red"><i className="material-icons">add</i></button>
      </div>
    </div>
  
  )
}

export default BoardsCollection
