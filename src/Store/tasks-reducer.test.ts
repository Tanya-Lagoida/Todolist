import { TasksStateType } from '../AppWithRedux';
import {
  addTaskAC,
  changeTaskAC,
  removeTaskAC,
  setTasksAC,
  taskReducer
} from './tasks-reducer';
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistAC,
  todolistid1,
  todolistid2
} from './todolists-reducer';
import { TaskPriorities, TaskStatuses } from '../api/todolists-api';

let startState: TasksStateType = {}

beforeEach(() => {
  startState = {
    "todolistId1": [
      { id: "1", title: "CSS", status: TaskStatuses.Completed, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
      { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
      { id: "3", title: "React", status: TaskStatuses.New, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
      { id: "4", title: "Redux", status: TaskStatuses.New, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle }
    ],
    "todolistId2": [
      { id: "1", title: "Cream-cheese", status: TaskStatuses.Completed, todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
      { id: "2", title: "Flour", status: TaskStatuses.Completed, todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
      { id: "3", title: "Butter", status: TaskStatuses.New, todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle }
    ]
  };
})


test('correct task should be deleted from correct array', () => {

  const action = removeTaskAC("todolistId2", "2");

  const endState = taskReducer(startState, action)

  expect(endState).toEqual({
    "todolistId1": [
      { id: "1", title: "CSS", status: TaskStatuses.Completed, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
      { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
      { id: "3", title: "React", status: TaskStatuses.New, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
      { id: "4", title: "Redux", status: TaskStatuses.New, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle }
    ],
    "todolistId2": [
      { id: "1", title: "Cream-cheese", status: TaskStatuses.Completed, todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
      { id: "3", title: "Butter", status: TaskStatuses.New, todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle }
    ]
  });
  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy;
});

test('correct task should be added to correct array', () => {
  const action = addTaskAC({
    todoListId: "todolistId2",
    title: "Milk",
    status: TaskStatuses.New,
    id: "id exists",
    startDate: "",
    priority: TaskPriorities.Middle,
    description: "",
    deadline: "",
    addedDate: "",
    order: 0
  });

  const endState = taskReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("Milk");
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

  const action = changeTaskAC("todolistId2", '2' , {status: TaskStatuses.New} );

  const endState = taskReducer(startState, action)

  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);

});

test('title of specified task should be changed', () => {

  const action = changeTaskAC("todolistId1", "3", {title: 'DOM'} );

  const endState = taskReducer(startState, action)

  expect(endState["todolistId1"][2].title).toBe("DOM");
  expect(endState["todolistId2"][2].title).toBe("Butter");

});


test('new array should be added when new todolist is added', () => {

  const action = addTodolistAC({
    addedDate: '',
    order: 0,
    id: '',
    title: "new todolist"
  });

  const endState = taskReducer(startState, action)


  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

  const action = removeTodolistAC("todolistId2");

  const endState = taskReducer(startState, action)


  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty array should be added when set todolist ', () => {

  const action = setTodolistAC([
    {id: "1", title: "What to learn", order: 0, addedDate: ''},
    {id: "2", title: "What to buy", order: 0, addedDate: ''}
  ]);

  const endState = taskReducer({}, action)


  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toBe([]);
  expect(endState["2"]).toBe([]);
});

test('tasks should be added for todolist ', () => {

  const action = setTasksAC(startState["todolistId1"], "todolistId1");

  const endState = taskReducer({
    "todolistId2": [],
    "todolistId1": []
  }, action)

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
});