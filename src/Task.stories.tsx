import React from 'react';
import { action } from '@storybook/addon-actions';
import { Task } from './Task';
import { ThemeDecorator } from './stories/Decorators/ThemeDecorator';
import { TaskPriorities, TaskStatuses } from './api/todolists-api';
import { todolistid1, todolistid2 } from './Store/todolists-reducer';

export default {
  title:  'Task Component',
  component: Task,
  decorators: [ThemeDecorator]
}


const changeTaskTitleCallback = action("Title was changed")
const removeTaskCallback = action("Task was removed")
const changeTaskStatusCallback = action("Status was changed")

export const TaskExample = () => {
  return <>
  <Task
    task={{id: '1', title: 'CSS', status: TaskStatuses.Completed, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle}}
    removeTask={removeTaskCallback}
    changeTaskTitle={changeTaskTitleCallback}
    changeTaskStatus={changeTaskStatusCallback}
    todolistId={'todolistId1'}
  />
  <Task
    task={{id: '2', title: 'JS', status: TaskStatuses.New, todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle}}
    removeTask={removeTaskCallback}
    changeTaskTitle={changeTaskTitleCallback}
    changeTaskStatus={changeTaskStatusCallback}
    todolistId={'todolistId2'}
  />
    </>



}