import { Provider } from 'react-redux';
import React from 'react';
import {combineReducers} from 'redux'
import {taskReducer} from '../../Store/tasks-reducer'
import {todolistsReducer} from '../../Store/todolists-reducer'
import {v1} from 'uuid'
import {AppRootType} from '../../Store/store'
import { legacy_createStore as createStore} from 'redux'


const rootReducer = combineReducers({
  tasks: taskReducer,
  todolists: todolistsReducer
})

const initialGlobalState = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all"},
    {id: "todolistId2", title: "What to buy", filter: "all"}
  ] ,
  tasks: {
    ["todolistId1"]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    ["todolistId2"]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootType);


export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>
      {(storyFn())}
  </Provider>
}