import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import { EditableSpan } from './EditableSpan';
import { Delete } from '@mui/icons-material';
import { TaskStatuses, TaskType } from './api/todolists-api';

type TaskPropsType = {
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
  task: TaskType
  todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
  const onRemoveHandler = () => {
    props.removeTask(props.todolistId, props.task.id);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId);

  };
  const onChangeTitleHandler = useCallback((newTitle: string) => {
    props.changeTaskTitle(newTitle, props.todolistId, props.task.id);
  }, [props.changeTaskTitle, props.todolistId, props.task.id]);

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