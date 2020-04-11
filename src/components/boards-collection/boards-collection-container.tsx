import React from 'react'
import BoardsCollection from './boards-collection'
import { connect } from 'react-redux'
import { IBoard } from '../../types/types'
import { addNewBoardAC, deleteBoardAC } from '../../redux/board-reducer'

type MapStatePropsType = {
  boards: Array<IBoard>
}
type MapDispatchPropsType = {
  addNewBoard: (name: string) => void
  deleteBoard: (boardId: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

const BoardsCollectionContainer: React.FC<PropsType> = (props) => {


  return (
    <BoardsCollection 
      boards={props.boards}
      addNewBoard={props.addNewBoard}
      deleteBoard={props.deleteBoard}
    />
  )
}

const mapStateToProps = (state: any): MapStatePropsType => {
  return {
    boards: state.boards.boards
  } 
}

export default connect(mapStateToProps,{
  addNewBoard: addNewBoardAC,
  deleteBoard: deleteBoardAC
}) (BoardsCollectionContainer)
