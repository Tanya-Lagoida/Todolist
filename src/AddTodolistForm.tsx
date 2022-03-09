import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

export type AddTodolistFormType = {
  addItem: (title: string) => void
}

export function AddTodolistForm(props: AddTodolistFormType) {

  let [newTaskTitle, setNewTaskTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
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


  return <div>
    <input value={newTaskTitle}
           onChange={onNewTitleChangeHandler}
           onKeyPress={onKeyPressHandler}
           className={error ? 'error' : ''}
    />
    <button onClick={addTask}>+</button>
    {error && <div className="error-message">{error}</div>}
  </div>


}