import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValueType,
  removeTodolistAC, setTodolistAC,
  TodolistDomainType,
  todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import { Dispatch } from 'redux';
import { useEffect } from 'react';
import { todolistsAPI } from '../api/todolists-api';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
    {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
  ]
})


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  let newTodolistTitle = "New Todolist";

  const endState = todolistsReducer(startState, addTodolistAC({
    title: newTodolistTitle,
    addedDate: "",
    order: 0,
    id: ""
  }))

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
});

test('correct todolist should change its name', () => {let newTodolistTitle = "New Todolist";

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValueType = "completed";

  const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2))

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set to the state', () => {

  const endState = todolistsReducer([], setTodolistAC(startState))

  expect(endState.length).toBe(2);
});



