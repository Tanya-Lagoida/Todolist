import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from 'react';
import { FilterValueType } from './App';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValueType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValueType
}

export function Todolist(props: PropsType) {

  let [newTaskTitle, setNewTaskTitle] = useState('');
  let [error, setError] = useState<string | null>(null);


  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.code === 'Enter' && newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle);
      setNewTaskTitle('');
    }
    if (e.code === 'Enter' && newTaskTitle.trim() == '') {
      setError('Field is required');
    }

  };

  const addTask = () => {
    if (newTaskTitle.trim() === '') {
      setError('Field is required');
      return;
    }
    props.addTask(newTaskTitle);
    setNewTaskTitle('');
  };

  const onAllClickHandler = () => {
    props.changeFilter('all');
  };
  const onActiveClickHandler = () => {
    props.changeFilter('active');
  };
  const onCompletedClickHandler = () => {
    props.changeFilter('completed');
  };


  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {
            const onRemoveHandler = () => {
              props.removeTask(t.id);
            };
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked);
            };

            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input type="checkbox"
                     checked={t.isDone}
                     onChange={onChangeHandler}/>
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>;
          })
        }
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''}
                onClick={onAllClickHandler}>All
        </button>
        <button className={props.filter === 'active' ? 'active-filter' : ''}
                onClick={onActiveClickHandler}>Active
        </button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''}
                onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>

  );
}