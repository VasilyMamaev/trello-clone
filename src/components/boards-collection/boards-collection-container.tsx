import React from 'react'
import BoardsCollection from './boards-collection'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { IBoard } from '../../types/types'
import { addNewBoardAC } from '../../redux/board-reducer'

type MapStatePropsType = {
  boards: Array<IBoard>
}
type MapDispatchPropsType = {
  addNewBoard: (name: string) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

const BoardsCollectionContainer: React.FC<PropsType> = (props) => {


  return (
    <BoardsCollection 
      boards={props.boards}
      addNewBoard={props.addNewBoard}
    />
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    boards: state.boards
  } 
}

export default connect(mapStateToProps,{addNewBoard: addNewBoardAC}) (BoardsCollectionContainer)
