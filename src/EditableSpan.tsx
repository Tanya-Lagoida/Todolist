import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';

type EditableSpanPropsType = {
  title: string
  onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.title);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);


  return editMode
    ? <TextField variant="standard" value={title} color={'secondary'} onChange={onChangeTitleHandler} onBlur={activateViewMode}
             autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>;
}