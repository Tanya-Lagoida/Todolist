
import { addTodolistAC, TodolistDomainType, todolistsReducer } from './todolists-reducer';
import { taskReducer } from './tasks-reducer';
import { TasksStateType } from '../TodoListLists';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const action = addTodolistAC({
    title: "new todolist",
    id: '',
    order: 0,
    addedDate: ''
  });

  const endTasksState = taskReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolist.id);
  expect(idFromTodolists).toBe(action.todolist.id);
});
