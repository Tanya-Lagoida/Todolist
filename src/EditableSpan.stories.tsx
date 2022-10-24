import React from 'react';
import {action} from '@storybook/addon-actions';
import { EditableSpan } from './EditableSpan';
import { ReduxStoreProviderDecorator } from './stories/Decorators/ReduxStoreProviderDecorator';
import { ThemeDecorator } from './stories/Decorators/ThemeDecorator';

export default {
  title:  'EditableSpan Component',
  component: EditableSpan,
  decorators: [ThemeDecorator]
}

const changeTitleCallback = action("Title was changed")

export const EditableSpanExample = () => {
  return <EditableSpan title={'New Title'} onChange={changeTitleCallback} />

}