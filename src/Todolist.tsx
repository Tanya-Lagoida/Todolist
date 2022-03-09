import React, { ChangeEvent } from 'react';
import { FilterValueType } from './App';
import { AddTodolistForm } from './AddTodolistForm';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string,todolistId: string) => void
  changeFilter: (value: FilterValueType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTitle: (taskId: string, newTitle: string, todolistId: string) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  const onAllClickHandler = () => {
    props.changeFilter('all', props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter('active', props.id);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter('completed', props.id);
  };
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  }

  return (
    <div>
      <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <button onClick={removeTodolist}>x</button>
      </h3>
      <AddTodolistForm addItem={addTask} />
      <ul>
        {
          props.tasks.map(t => {
            const onRemoveHandler = () => {
              props.removeTask(t.id, props.id);
            };
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
            };
            const onChangeTitleHandler = (newTitle: string) => {
              props.changeTitle(t.id, newTitle, props.id);
            };

            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
              <input type="checkbox"
                     checked={t.isDone}
                     onChange={onChangeHandler}/>
              <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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

