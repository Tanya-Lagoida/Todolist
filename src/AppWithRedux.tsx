import React, { useCallback, useEffect } from 'react';
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
import { addTodolistTC,
  changeTodolistFilterAC,deleteTodolistTC, fetchTodolistsTC,
  FilterValueType,
  TodolistDomainType, updateTodolistTitleTC
} from './Store/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootType } from './Store/store';
import {
  addTaskTC, changeTaskTC, deleteTasksTC
} from './Store/tasks-reducer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';
import { TaskStatuses, TaskType } from './api/todolists-api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c54b2'
    },
    secondary: amber
  }
});

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export function AppWithRedux() {
  const tasks = useSelector<AppRootType, TasksStateType>(state => state.tasks);
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootType, Array<TodolistDomainType>>(state => state.todolists);


  useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);

  const removeTask = useCallback((todolistId: string, taskId: string) => {
    dispatch(deleteTasksTC(todolistId, taskId));
  }, [dispatch]);

  const addTask = useCallback((todolistId: string, title: string) => {
    dispatch(addTaskTC(todolistId, title));
  }, [dispatch]);

  const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTC(todolistId, taskId, {title} ));
  }, [dispatch]);

  const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(changeTaskTC(todolistId, taskId, { status }));
  }, [dispatch]);

  const changeFilter = useCallback((value: FilterValueType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(value, todolistId));
  }, [dispatch]);

  const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
    dispatch(updateTodolistTitleTC(todolistId, newTitle));
  }, [dispatch]);

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(deleteTodolistTC(todolistId));
  }, [dispatch]);

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title));
  }, [dispatch]);

  return <ThemeProvider theme={theme}>
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
        <Grid container style={{ padding: '20px' }}>
          <AddTodolistForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={4}>
          {
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;

              return <Grid item key={tl.id}>
                <Paper elevation={3} style={{ padding: '20px' }}>
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
  </ThemeProvider>;
}


