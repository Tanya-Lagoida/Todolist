import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore
} from 'redux';
import { todolistsReducer } from './todolists-reducer';
import { taskReducer } from './tasks-reducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: taskReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;