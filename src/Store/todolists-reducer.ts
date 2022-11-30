import { v1 } from 'uuid';
import { todolistsAPI, TodolistsType } from '../api/todolists-api';
import { Dispatch } from 'redux';

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
  todolist: TodolistsType
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

export type SetTodolistsActionType = {
  type: 'SET-TODOLIST'
  todolists: Array<TodolistsType>
}

export const todolistid1 = v1();
export const todolistid2 = v1();

/*const initialState: Array<TodolistDomainType> = [
  { id: todolistid1, title: 'What to learn', filter: 'active', addedDate: '', order: 0 },
  { id: todolistid2, title: 'What to bye', filter: 'completed', addedDate: '', order: 0 }
]*/

const initialState: Array<TodolistDomainType> = []


type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id);
    };
    case 'ADD-TODOLIST': {
      return [{ ...action.todolist, filter: 'all' }, ...state]
    };
    case 'CHANGE-TODOLIST-TITLE': {

      state.map(t => t.id === action.id ? t.title = action.title : t)
      return [...state]
    };
    case 'CHANGE-TODOLIST-FILTER': {
      state.map(tl => tl.id === action.id ? tl.filter = action.filter : tl)
        return [...state]
    };
    case 'SET-TODOLIST': {
      return action.todolists.map(tl => {
        return {
          ...tl,
          filter: 'all'
        }
      })
    }
    default:
      return state;
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (todolist: TodolistsType): AddTodolistActionType => {
  return { type: 'ADD-TODOLIST', todolist }
}

export const changeTodolistTitleAC = (id: string, title: string):ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (filter: FilterValueType, id: string ): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}

export const setTodolistAC = ( todoLists: Array<TodolistsType> ): SetTodolistsActionType => {
  return {type: 'SET-TODOLIST',  todolists: todoLists}
}

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.getTodolists()
      .then(res => {
        dispatch(setTodolistAC(res.data));
      });
  };
}

export const deleteTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.deleteTodolist(todolistId)
      .then(res => {
        dispatch(removeTodolistAC(todolistId));
      });
  };
}

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.createTodolist(title)
      .then(res => {
        dispatch(addTodolistAC(res.data.data.item));
      });
  };
}

export const updateTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.updateTodolistTitle(id, title)
      .then(res => {
        dispatch(changeTodolistTitleAC(id, title));
      });
  };
}



