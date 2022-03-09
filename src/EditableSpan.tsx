import React, { ChangeEvent, useState } from 'react';

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
    ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode}
             autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>;
}