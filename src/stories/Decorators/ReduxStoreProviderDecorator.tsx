import { Provider } from 'react-redux';
import React from 'react';
import {combineReducers} from 'redux'
import {taskReducer} from '../../Store/tasks-reducer'
import {
  todolistid1,
  todolistid2,
  todolistsReducer
} from '../../Store/todolists-reducer';
import {v1} from 'uuid'
import {AppRootType} from '../../Store/store'
import { legacy_createStore as createStore} from 'redux'
import { TaskPriorities, TaskStatuses } from '../../api/todolists-api';


const rootReducer = combineReducers({
  tasks: taskReducer,
  todolists: todolistsReducer
})

const initialGlobalState: AppRootType = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
    {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle, status: TaskStatuses.Completed },
      {id: v1(), title: "JS", todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle, status: TaskStatuses.Completed}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle, status: TaskStatuses.Completed},
      {id: v1(), title: "React Book", todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle, status: TaskStatuses.Completed}
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>
      {(storyFn())}
  </Provider>
}