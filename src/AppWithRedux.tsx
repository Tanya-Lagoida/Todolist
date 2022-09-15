import React, { useCallback } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { AddTodolistForm } from './AddTodolistForm';
import {
  AppBar,
  Button,
  Container, Grid,
  IconButton, Paper,
  Toolbar,
  Typography
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, removeTodolistAC,
} from './Store/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootType } from './Store/store';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC
} from './Store/tasks-reducer';

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

export type TaskType = {
  isDone: boolean
  id: string
  title: string
}

export type FilterValueType = 'all' | 'active' | 'completed';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export function AppWithRedux() {
  const tasks = useSelector<AppRootType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootType, Array<TodolistType>>(state => state.todolists)

  const removeTask = useCallback( (todolistId: string, taskId: string) => {
    dispatch(removeTaskAC(todolistId, taskId))
  }, [dispatch])

  const addTask = useCallback( (title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId))
  }, [dispatch])

  const changeTaskTitle = useCallback( (title: string, todolistId: string, taskId: string) => {
    dispatch(changeTaskTitleAC(title, todolistId, taskId))
  }, [dispatch])

  const changeTaskStatus = useCallback( (taskId: string, isDone: boolean, todolistId: string ) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
  }, [dispatch])

  const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(value, todolistId))
  }, [dispatch] )

  const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(todolistId, newTitle))
  }, [dispatch] )

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }, [dispatch] )

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [dispatch])

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddTodolistForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={4}>
          {
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id]
              let tasksForTodolist = allTodolistTasks

              return <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: "20px"}}>
                  <Todolist
                    tasks={tasksForTodolist}
                    title={tl.title}
                    id={tl.id}
                    changeTodolistTitle={changeTodolistTitle}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}

                  />
                </Paper>
              </Grid>;
            })
          }
        </Grid>
      </Container>


    </div>
  );
}


