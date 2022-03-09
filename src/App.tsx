import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddTodolistForm } from './AddTodolistForm';

type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed';

type TasksStateType = {
  [key: string]: Array<TaskType>
}

export function App() {

  function removeTask(id: string, todolistId: string) {
    setTasks({
      ...tasksObj,
      [todolistId]: tasksObj[todolistId].filter(t => t.id !== id)
    });
  }

  function addTask(title: string, todolistId: string) {
    const newTask = { id: v1(), title: title, isDone: false };
    setTasks({ ...tasksObj, [todolistId]: [newTask, ...tasksObj[todolistId]] });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    setTasks({
      ...tasksObj, [todolistId]: tasksObj[todolistId]
        .map(t => t.id === taskId ? { ...t, isDone } : t)
    });
  }

  function changeTitle(taskId: string, newTitle: string, todolistId: string) {
    setTasks({
      ...tasksObj, [todolistId]: tasksObj[todolistId]
        .map(t => t.id === taskId ? { ...t, title: newTitle } : t)
    });
  }

  function changeFilter(value: FilterValueType, todolistId: string) {
    const todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists]);
    }
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    todolists.map(t => t.id === todolistId ? t.title = newTitle : t);
    setTodolist([...todolists]);
  }

  const todolistid1 = v1();
  const todolistid2 = v1();

  const [todolists, setTodolist] = useState<Array<TodolistType>>([
    { id: todolistid1, title: 'What to learn', filter: 'active' },
    { id: todolistid2, title: 'What to bye', filter: 'completed' }
  ]);

  function removeTodolist(todolistId: string) {
    let filterTodolist = todolists.filter(tl => tl.id !== todolistId);
    setTodolist(filterTodolist);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  const [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistid1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false }
    ],
    [todolistid2]: [
      { id: v1(), title: 'Cream-cheese', isDone: true },
      { id: v1(), title: 'Flour', isDone: true },
      { id: v1(), title: 'Butter', isDone: false }
    ]
  });

  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = { id: newTodolistId, title: title, filter: 'all' };
    setTodolist([...todolists, newTodolist]);
    setTasks({
      ...tasksObj,
      [newTodolistId]: []
    });
  }


  return (
    <div className="App">
      <AddTodolistForm addItem={addTodolist}/>
      {
        todolists.map(tl => {

          let tasksForTodoList = tasksObj[tl.id];
          if (tl.filter === 'completed') {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
          }
          if (tl.filter === 'active') {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
          }

          return <Todolist title={tl.title}
                           key={tl.id}
                           id={tl.id}
                           tasks={tasksForTodoList}
                           removeTask={removeTask}
                           changeTodolistTitle={changeTodolistTitle}
                           changeFilter={changeFilter}
                           addTask={addTask}
                           changeTaskStatus={changeStatus}
                           changeTitle={changeTitle}
                           filter={tl.filter}
                           removeTodolist={removeTodolist}

          />;
        })
      }


    </div>
  );
}


