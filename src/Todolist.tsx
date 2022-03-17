import React, { ChangeEvent } from 'react';
import { FilterValueType } from './App';
import { AddTodolistForm } from './AddTodolistForm';
import { EditableSpan } from './EditableSpan';
import { Button, ButtonGroup, Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

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
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddTodolistForm addItem={addTask} />
      <div>
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

            return <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox checked={t.isDone}
                        onChange={onChangeHandler}
                        color={'secondary'}
                        defaultChecked/>

              <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
              <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete />
              </IconButton>
            </div>;
          })
        }
      </div>
      <ButtonGroup color={'primary'} variant="contained" aria-label="outlined primary button group">
        <Button color={props.filter === 'all' ? 'secondary' : 'primary'}
                onClick={onAllClickHandler}>All
        </Button>
        <Button color={props.filter === 'active' ? 'secondary' : 'primary'}
                onClick={onActiveClickHandler}>Active
        </Button>
        <Button color={props.filter === 'completed' ? 'secondary' : 'primary'}
                onClick={onCompletedClickHandler}>Completed
        </Button>
      </ButtonGroup>
    </div>
  );
}

