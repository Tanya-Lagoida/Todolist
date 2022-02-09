import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Redux', isDone: false }
  ]);
  let [filter, setFilter] = useState<FilterValueType>('all');

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  }


  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }


  let tasksForTodoList = tasks;
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true);
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => t.isDone === false);
  }


  // let tasks2 = [
  //   { id: 1, title: 'HouseMD', isDone: true },
  //   { id: 2, title: 'Better coll Sole', isDone: true }
  // ];

  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={filter}

      />
      {/*<Todolist title="Movies" tasks={tasks2}/>*/}

    </div>
  );
}

export default App;
