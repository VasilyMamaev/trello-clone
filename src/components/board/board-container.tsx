import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'
import Board from './board'
import { connect } from 'react-redux'
import { IBoard } from '../../types/types'
import { addNewListAC, addNewTaskAC } from '../../redux/board-reducer'

type MapStatePropsType = {
  boards: Array<IBoard>
}
type MapDispatchPropsType = {
  addNewList: (name: string, boardID: number, newListID: number) => void
  addNewTask: (name: string, boardID: number, listID: number, isDone: boolean) => void
}
type IdType = {
  id: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<IdType>

const BoardContainer = (props: PropsType) => {

  let board: number = +props.match.params.id -1
  let name = props.boards[board].name
  let lists = props.boards[board].lists

  return (
    <Board
      boardName={name}
      lists={lists}
      boardId={board}
      addNewList={props.addNewList}
      addNewTask={props.addNewTask}
    />
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    boards: state.boards.boards
  }
}

export default connect(mapStateToProps, {addNewList: addNewListAC, addNewTask: addNewTaskAC}) (withRouter(BoardContainer))

