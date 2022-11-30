import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import { EditableSpan } from './EditableSpan';
import { Delete } from '@mui/icons-material';
import { TaskStatuses, TaskType } from './api/todolists-api';

type TaskPropsType = {
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string ) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  task: TaskType
  todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
  const onRemoveHandler = () => {
    props.removeTask(props.todolistId, props.task.id);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New );

  };
  const onChangeTitleHandler = useCallback((newTitle: string) => {
    props.changeTaskTitle(props.todolistId, props.task.id, newTitle );
  }, [props.todolistId, props.task.id, props.changeTaskTitle]);

  return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
    <Checkbox checked={props.task.status === TaskStatuses.Completed}
              onChange={onChangeHandler}
              color={'secondary'}
              defaultChecked/>

    <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
    <IconButton aria-label="delete" onClick={onRemoveHandler}>
      <Delete/>
    </IconButton>
  </div>;
});