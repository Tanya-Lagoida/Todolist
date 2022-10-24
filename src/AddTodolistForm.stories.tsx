import React from 'react';
import { AddTodolistForm } from './AddTodolistForm';
import {action} from '@storybook/addon-actions';
import { ReduxStoreProviderDecorator } from './stories/Decorators/ReduxStoreProviderDecorator';
import { ThemeDecorator } from './stories/Decorators/ThemeDecorator';

export default {
  title:  'AddTodolistForm Component',
  component: AddTodolistForm,
  decorators: [ThemeDecorator]
}

const callback = action("Button was pressed")

export const AddTodolistFormExample = (props: any) => {
  return <AddTodolistForm addItem={callback } />

}