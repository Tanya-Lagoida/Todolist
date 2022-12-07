import { v1 } from 'uuid';
import { todolistsAPI, TodolistsType } from '../api/todolists-api';
import { AppThunk } from './store';

export type FilterValueType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistsType & {
  filter: FilterValueType
}

export const todolistid1 = v1();
export const todolistid2 = v1();

/*const initialState: Array<TodolistDomainType> = [
  { id: todolistid1, title: 'What to learn', filter: 'active', addedDate: '', order: 0 },
  { id: todolistid2, title: 'What to bye', filter: 'completed', addedDate: '', order: 0 }
]*/

const initialState: Array<TodolistDomainType> = [];

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistActionType = ReturnType<typeof setTodolistAC>

export type TodolistsActionType =
  RemoveTodolistActionType |
  AddTodolistActionType |
  ReturnType<typeof changeTodolistTitleAC> |
  ReturnType<typeof changeTodolistFilterAC> |
  SetTodolistActionType

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState,
                                 action: TodolistsActionType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id);
    case 'ADD-TODOLIST':
      return [{ ...action.todolist, filter: 'all' }, ...state];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(t => t.id === action.id ? { ...t, title: action.title } : t);
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl);
    case 'SET-TODOLIST':
      return action.todolists.map(tl => ({ ...tl, filter: 'all' }));
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) =>
  ({ type: 'REMOVE-TODOLIST', id: todolistId } as const);
export const addTodolistAC = (todolist: TodolistsType) =>
  ({ type: 'ADD-TODOLIST', todolist } as const);
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({ type: 'CHANGE-TODOLIST-TITLE', id, title } as const);
export const changeTodolistFilterAC = (filter: FilterValueType, id: string) =>
  ({ type: 'CHANGE-TODOLIST-FILTER', filter, id } as const);
export const setTodolistAC = (todoLists: Array<TodolistsType>) =>
  ({ type: 'SET-TODOLIST', todolists: todoLists } as const);

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  todolistsAPI.getTodolists()
    .then(res => {
      dispatch(setTodolistAC(res.data));
    });
};

export const deleteTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
  todolistsAPI.deleteTodolist(todolistId)
    .then(res => {
      dispatch(removeTodolistAC(todolistId));
    });
};

export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
  todolistsAPI.createTodolist(title)
    .then(res => {
      dispatch(addTodolistAC(res.data.data.item));
    });
};

export const updateTodolistTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
  todolistsAPI.updateTodolistTitle(id, title)
    .then(res => {
      dispatch(changeTodolistTitleAC(id, title));
    });
};
