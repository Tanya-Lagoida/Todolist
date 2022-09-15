import React, { useCallback } from 'react';
import { FilterValueType, TaskType } from './AppWithRedux';
import { AddTodolistForm } from './AddTodolistForm';
import { EditableSpan } from './EditableSpan';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Task } from './Task';


type PropsType = {
  id: string
  tasks: Array<TaskType>
  title: string
  changeFilter: (value: FilterValueType, todolistId: string) => void
  filter: FilterValueType
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (id: string, title: string) => void
  removeTask: (todolistId: string, taskId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskTitle: (title: string, todolistId: string, taskId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string ) => void
}

export const Todolist = React.memo((props: PropsType) => {
  console.log('todolist');

  const addTask = useCallback((title: string) => {
      props.addTask(title, props.id)
  }, [ props.addTask, props.id])

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
    tasksForTodoList = props.tasks.filter(t => t.isDone === true);
  }
  if (props.filter === 'active') {
    tasksForTodoList = props.tasks.filter(t => t.isDone === false);
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

