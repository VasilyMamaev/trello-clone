import React from 'react'
import BoardsCollection from './boards-collection'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { IBoard } from '../../types/types'

type MapStatePropsType = {
  boards: Array<IBoard>
}
type MapDispatchPropsType = {

}
type PropsType = MapStatePropsType & MapDispatchPropsType

const BoardsCollectionContainer: React.FC<PropsType> = (props) => {


  return (
    <BoardsCollection boards={props.boards}/>
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    boards: state.boards
  } 
}

export default connect(mapStateToProps,{}) (BoardsCollectionContainer)
