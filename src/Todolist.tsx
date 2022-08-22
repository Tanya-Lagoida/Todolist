import React, { ChangeEvent } from 'react';
import { FilterValueType } from './AppWithRedux';
import { AddTodolistForm } from './AddTodolistForm';
import { EditableSpan } from './EditableSpan';
import { Button, ButtonGroup, Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootType } from './Store/store';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC
} from './Store/tasks-reducer';

export type TaskType = {
  isDone: boolean
  id: string
  title: string

}

type PropsType = {
  id: string
  title: string
  changeFilter: (value: FilterValueType, todolistId: string) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

  const tasksObj = useSelector<AppRootType, Array<TaskType>>(state => state.tasks[props.id])
  const dispatch = useDispatch();

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

  let tasksForTodoList = tasksObj;
  if (props.filter === 'completed') {
    tasksForTodoList = tasksForTodoList.filter(t => t.isDone);
  }
  if (props.filter === 'active') {
    tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
  }

  return (
    <div>
      <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddTodolistForm addItem={(title) => {
        dispatch(addTaskAC(title, props.id))
      }} />
      <div>
        {
          tasksForTodoList.map(t => {
            const onRemoveHandler = () => {
              dispatch(removeTaskAC(t.id, props.id))
            };
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeTaskStatusAC( t.id, e.currentTarget.checked, props.id))

            };
            const onChangeTitleHandler = (newTitle: string) => {
              dispatch(changeTaskTitleAC(t.id, newTitle, props.id))
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

