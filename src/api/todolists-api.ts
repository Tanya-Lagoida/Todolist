import axios from 'axios'

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "b52a002d-f0a3-465d-96d7-30d5b1e7fca5"
  }
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings
})


export type TodolistsType = {
  id: string,
  title: string,
  addedDate: string,
  order: number
}

type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  data: D
}

export enum TaskStatuses {
  New,
  InProgress,
  Completed,
  Draft
}

export enum TaskPriorities {
  Low,
  Middle,
  High,
  Urgently,
  Later
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export type ModelType = {
  title: string
  description: string
  // completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
}

export const todolistsAPI = {
  getTodolists(){
     return instance.get<Array<TodolistsType>>("todo-lists" )
  },
  createTodolist(title: string){
    return instance.post<ResponseType<{item: TodolistsType}>>("todo-lists", {title: title} )
  },
  deleteTodolist(id: string){
    return instance.delete<ResponseType>(`todo-lists/${id}` )
  },
  updateTodolistTitle(id: string, title: string){
    return instance.put<ResponseType>(`todo-lists/${id}`, {title: title} )
  },
  getTasks(todolistId: string){
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  deleteTask(todolistId: string, taskId: string){
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}` )
  },
  createTask(todolistId: string, title: string){
    return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: title})
  },
  updateTaskTitle(todolistId: string, taskId: string, model: ModelType ){
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}
