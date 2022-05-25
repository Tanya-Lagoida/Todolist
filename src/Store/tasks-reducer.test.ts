import { TasksStateType } from '../App';
import {
  addTaskAC,
  changeTaskStatusAC, changeTaskTitleAC,
  removeTaskAC,
  taskReducer
} from './tasks-reducer';
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Redux", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "Cream-cheese", isDone: true },
      { id: "2", title: "Flour", isDone: true },
      { id: "3", title: "Butter", isDone: false }
    ]
  };

  const action = removeTaskAC("todolistId2", "2");

  const endState = taskReducer(startState, action)

  expect(endState).toEqual({
    "todolistId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Redux", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "Cream-cheese", isDone: true },
      { id: "3", title: "Butter", isDone: false }
    ]
  });
  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy;
});

test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Redux", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "Cream-cheese", isDone: true },
      { id: "2", title: "Flour", isDone: true },
      { id: "3", title: "Butter", isDone: false }
    ]
  };

  const action = addTaskAC("Milk", "todolistId2");

  const endState = taskReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("Milk");
  expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Redux", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "Cream-cheese", isDone: true },
      { id: "2", title: "Flour", isDone: true },
      { id: "3", title: "Butter", isDone: false }
    ]
  };

  const action = changeTaskStatusAC(false, "2", "todolistId2");

  const endState = taskReducer(startState, action)

  expect(endState["todolistId2"][1].isDone).toBe(false);
  expect(endState["todolistId1"][1].isDone).toBe(true);

});

test('title of specified task should be changed', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Redux", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "Cream-cheese", isDone: true },
      { id: "2", title: "Flour", isDone: true },
      { id: "3", title: "Butter", isDone: false }
    ]
  };

  const action = changeTaskTitleAC("DOM", "todolistId1", "3");

  const endState = taskReducer(startState, action)

  expect(endState["todolistId1"][2].title).toBe("DOM");
  expect(endState["todolistId2"][2].title).toBe("Butter");

});


test('new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Redux", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "Cream-cheese", isDone: true },
      { id: "2", title: "Flour", isDone: true },
      { id: "3", title: "Butter", isDone: false }
    ]
  };

  const action = addTodolistAC("new todolist");

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
  const startState: TasksStateType = {
    "todolistId1": [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Redux", isDone: false }
    ],
    "todolistId2": [
      { id: "1", title: "Cream-cheese", isDone: true },
      { id: "2", title: "Flour", isDone: true },
      { id: "3", title: "Butter", isDone: false }
    ]
  };

  const action = removeTodolistAC("todolistId2");

  const endState = taskReducer(startState, action)


  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});




