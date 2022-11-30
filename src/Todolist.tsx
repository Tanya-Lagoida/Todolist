import React, { useCallback, useEffect } from 'react';
import { AddTodolistForm } from './AddTodolistForm';
import { EditableSpan } from './EditableSpan';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Task } from './Task';
import { TaskStatuses, TaskType } from './api/todolists-api';
import { FilterValueType } from './Store/todolists-reducer';
import { useDispatch } from 'react-redux';
import { fetchTasksTC } from './Store/tasks-reducer';


type PropsType = {
  id: string
  tasks: Array<TaskType>
  title: string
  changeFilter: (value: FilterValueType, todolistId: string) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses ) => void
}

export const Todolist = React.memo((props: PropsType) => {
  console.log('todolist');

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(props.id));
  }, []);

  const addTask = useCallback((title: string) => {
      props.addTask(props.id, title)
  }, [ props.id, props.addTask ])

  const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id),[props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id),[props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id),[props.changeFilter, props.id]);

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }
  const changeTodolistTitle = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  }, [props.changeTodolistTitle, props.id])

  let tasksForTodoList = props.tasks;
  if (props.filter === 'completed') {
    tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed);
  }
  if (props.filter === 'active') {
    tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New);
  }

  return (
    <div>
      <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton aria-label="delete" onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddTodolistForm addItem={addTask}/>
      <div>
        {
          tasksForTodoList.map(t => <Task
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
            task={t}
            todolistId={props.id}
            key={t.id}
          />)
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
} )

