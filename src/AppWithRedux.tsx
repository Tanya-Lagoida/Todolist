import React from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
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

export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}

export type FilterValueType = 'all' | 'active' | 'completed';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export function AppWithRedux() {

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootType, Array<TodolistType>>(state => state.todolists)


  function changeFilter(value: FilterValueType, todolistId: string) {
    dispatch(changeTodolistFilterAC(value, todolistId))
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    dispatch(changeTodolistTitleAC(todolistId, newTitle))
  }

  function removeTodolist(todolistId: string) {
    dispatch(removeTodolistAC(todolistId))
  }

  function addTodolist(title: string) {
    dispatch(addTodolistAC(title))
  }

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

              return <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: "20px"}}>
                  <Todolist
                    title={tl.title}
                    id={tl.id}
                    changeTodolistTitle={changeTodolistTitle}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
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


