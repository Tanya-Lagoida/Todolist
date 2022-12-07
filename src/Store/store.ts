import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore
} from 'redux';
import { TodolistsActionType, todolistsReducer } from './todolists-reducer';
import { taskReducer, TasksActionType } from './tasks-reducer';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: taskReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootType, unknown, AllActionType>

export type AllActionType = TodolistsActionType | TasksActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootType, unknown, AllActionType>

// @ts-ignore
window.store = store;