import React from 'react';
import {action} from '@storybook/addon-actions';
import { Task } from './Task';
import { ThemeDecorator } from './stories/Decorators/ThemeDecorator';

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
    task={{id: '1', title: 'CSS', isDone: true}}
    removeTask={removeTaskCallback}
    changeTaskTitle={changeTaskTitleCallback}
    changeTaskStatus={changeTaskStatusCallback}
    todolistId={'todolistId1'}
  />
  <Task
    task={{id: '2', title: 'JS', isDone: false}}
    removeTask={removeTaskCallback}
    changeTaskTitle={changeTaskTitleCallback}
    changeTaskStatus={changeTaskStatusCallback}
    todolistId={'todolistId2'}
  />
    </>



}