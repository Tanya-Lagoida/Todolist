import { FilterValueType, TodolistType } from '../App';
import { v1 } from 'uuid';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  todolistId: string
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValueType
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id);
    };
    case 'ADD-TODOLIST': {
      return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
    };
    case 'CHANGE-TODOLIST-TITLE': {
      state.map(t => t.id === action.id ? t.title = action.title : t)
      return [...state]
    };
    case 'CHANGE-TODOLIST-FILTER': {
      state.map(tl => tl.id === action.id ? tl.filter = action.filter : tl)
        return [...state]
    };
    default:
      throw new Error("I don't understand this action type!")
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}

export const changeTodolistTitleAC = (title: string, id: string):ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (filter: FilterValueType, id: string ): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}



