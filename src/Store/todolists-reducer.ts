import { v1 } from 'uuid';
import { TodolistsType } from '../api/todolists-api';

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistsType & {
  filter: FilterValueType
}

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

export const todolistid1 = v1();
export const todolistid2 = v1();

const initialState: Array<TodolistDomainType> = [
  { id: todolistid1, title: 'What to learn', filter: 'active', addedDate: '', order: 0 },
  { id: todolistid2, title: 'What to bye', filter: 'completed', addedDate: '', order: 0 }
]

type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id);
    };
    case 'ADD-TODOLIST': {
      return [{id: action.todolistId, title: action.title, filter: "all", addedDate: '', order: 0}, ...state]
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
      return state;
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}

export const changeTodolistTitleAC = (id: string, title: string):ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (filter: FilterValueType, id: string ): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}



