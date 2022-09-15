import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { AddBox } from '@mui/icons-material';

export type AddTodolistFormType = {
  addItem: (title: string) => void
}

export const AddTodolistForm = React.memo((props: AddTodolistFormType) => {

  let [newTaskTitle, setNewTaskTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }

    if (e.code === 'Enter' && newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle);
      setNewTaskTitle('');
    }
    if (e.code === 'Enter' && newTaskTitle.trim() == '') {
      setError('Field is required');
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === '') {
      setError('Field is required');
      return;
    }
    props.addItem(newTaskTitle);
    setNewTaskTitle('');
  };

  return (
    <div>
      <TextField
        value={newTaskTitle}
        variant={'outlined'}
        label={'Type value'}
        color={'primary'}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask}  color={'secondary'}>
        <AddBox />
      </IconButton>
    </div>
  );
} )