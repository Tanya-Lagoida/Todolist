import {  TasksStateType } from '../AppWithRedux';
import { v1 } from 'uuid';
import {
  AddTodolistActionType,
  RemoveTodolistActionType, todolistid1,
  todolistid2
} from './todolists-reducer';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  todolistId: string
  taskId: string
}
type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todolistId: string
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  todolistId: string
  title: string
}
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  todolistId: string
  isDone: boolean
}

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskTitleActionType | ChangeTaskStatusActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {
  [todolistid1]: [
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false }
  ],
  [todolistid2]: [
    { id: v1(), title: 'Cream-cheese', isDone: true },
    { id: v1(), title: 'Flour', isDone: true },
    { id: v1(), title: 'Butter', isDone: false }
  ]
}

export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return { ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }
    };

    case 'ADD-TASK': {
      const newTask = { id: v1(), title: action.title, isDone: false };
      return { ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]] }
    };

    case 'CHANGE-TASK-STATUS': {
      return { ...state,
        [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? { ...t, isDone: action.isDone } : t)
      }
    };

    case 'CHANGE-TASK-TITLE': {
      return { ...state, [action.todolistId]: state[action.todolistId]
        .map(t => t.id === action.taskId ? { ...t, title: action.title } : t)
      }
    };

    case 'ADD-TODOLIST': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = []
      return stateCopy
    };

    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    };
    default:
      return state;
  }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return { type: 'ADD-TASK', title: title, todolistId: todolistId }
}

export const changeTaskTitleAC = (title: string, todolistId: string, taskId: string):ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string ): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS',taskId, isDone, todolistId}
}

