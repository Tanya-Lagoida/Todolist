import { TaskStatuses, TaskType } from './api/todolists-api';
import { useSelector } from 'react-redux';
import { AppRootType } from './Store/store';
import { useAppDispatch } from './Store/hooks';
import {
  addTodolistTC,
  changeTodolistFilterAC, deleteTodolistTC,
  fetchTodolistsTC,
  FilterValueType,
  TodolistDomainType, updateTodolistTitleTC
} from './Store/todolists-reducer';
import React, { useCallback, useEffect } from 'react';
import { addTaskTC, changeTaskTC, deleteTasksTC } from './Store/tasks-reducer';
import { Grid, Paper } from '@mui/material';
import { Todolist } from './Todolist';
import { AddTodolistForm } from './AddTodolistForm';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export const TodoListLists: React.FC = () => {
  const tasks = useSelector<AppRootType, TasksStateType>(state => state.tasks);
  const todolists = useSelector<AppRootType, Array<TodolistDomainType>>(state => state.todolists);
  const dispatch = useAppDispatch();

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title));
  }, [dispatch]);

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
    dispatch(changeTaskTC(todolistId, taskId, { title }));
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

  return <>
    <Grid container style={{ padding: '20px' }}>
      <AddTodolistForm addItem={addTodolist}/>
    </Grid>
    <Grid container spacing={4}>
      {
        todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id];
          return <Grid item key={tl.id}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Todolist
                tasks={allTodolistTasks}
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
  </>;
};