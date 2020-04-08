export type IListTask = {
  id: number 
  taskName: string
  isDone: boolean
}

export type IList = {
  id: number
  name: string
  tasks: Array<IListTask> | null
}

 export type IBoard = {
  id: number 
  name: string
  lists: Array<IList> | Array<null>
}