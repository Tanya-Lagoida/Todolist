import { combineReducers, legacy_createStore as createStore } from 'redux';
import { todolistsReducer } from './todolists-reducer';
import { taskReducer } from './tasks-reducer';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: taskReducer
})

export const store = createStore(rootReducer);

export type AppRootType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;