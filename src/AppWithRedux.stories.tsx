import React from 'react';
import { action } from '@storybook/addon-actions';
import { AppWithRedux } from './AppWithRedux';
import { ReduxStoreProviderDecorator } from './stories/Decorators/ReduxStoreProviderDecorator';
import { ThemeDecorator } from './stories/Decorators/ThemeDecorator';

export default {
  title: 'AppWithRedux Component',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator, ThemeDecorator]
};

export const AppWithReduxExample = () => {
  return <AppWithRedux/>


};