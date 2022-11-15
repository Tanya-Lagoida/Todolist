import React, {useEffect, useState} from 'react'
import { todolistsAPI } from '../api/todolists-api';

export default {
  title: 'API'
}



export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsAPI.getTodolists()
      .then( (res) => {
        setState(res.data)
      } )

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('')
  const createTodolist = () => {
    todolistsAPI.createTodolist(title)
      .then( (res) => {
        setState(res.data)
      } )
  }
  return (
    <div> {JSON.stringify(state)}
    <div>
      <input value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
      <button onClick={createTodolist}>createTodolist</button>
    </div>
    </div>
  )
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const deleteTodolist = () => {
    todolistsAPI.deleteTodolist(todolistId)
      .then( (res) => {
        setState(res.data)
      } )
  }
  return <div> {JSON.stringify(state)}
    <div>
      <input value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
      <button onClick={deleteTodolist}>delete Todolist</button>
    </div>
  </div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('')
  const [id, setId] = useState<string>('')
  const updateTodolistTitle = () => {
    todolistsAPI.updateTodolistTitle(id, title)
      .then( (res) => {
        setState(res.data)
      } )
  }

  return <div> {JSON.stringify(state)}
  <div>
    <input value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
    <input value={id} onChange={(e) => {setId(e.currentTarget.value)}}/>
    <button onClick={updateTodolistTitle}>updateTodolistTitle</button>
  </div>
  </div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const getTasks = () => {
    todolistsAPI.getTasks(todolistId)
      .then( (res) => {
        setState(res.data)
      } )

  }

  return <div> {JSON.stringify(state)}
    <div>
      <input value={todolistId}
             onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
      <button onClick={getTasks}>GetTasks</button>
    </div>
  </div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const deleteTask = () => {
    todolistsAPI.deleteTask(todolistId, taskId)
      .then( (res) => {
        setState(res.data)
      } )
  }

  return <div> {JSON.stringify(state)}
  <div>
    <input value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
    <input value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
    <button onClick={deleteTask}>deleteTask</button>
  </div>
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')
  const createTask = () => {
    todolistsAPI.createTask(todolistId, title)
      .then( (res) => {
        setState(res.data)
      } )
  }
  return (
    <div> {JSON.stringify(state)}
      <div>
        <input value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <input value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <button onClick={createTask}>createTask</button>
      </div>
    </div>
  )
}

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null)
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string | null>('')
  const [deadline, setDeadline] = useState<string | null>('')

  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')
  const updateTaskTitle = () => {
    todolistsAPI.updateTaskTitle(todolistId, taskId, {
      title: taskTitle,
      description: description,
      status: status,
      priority: priority,
      startDate: '',
      deadline: ''
    })
      .then( (res) => {
        setState(res.data)
      } )
  }
  return (
    <div> {JSON.stringify(state)}
      <div>
        <input value={taskTitle} onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
        <input value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
        <input value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
        <input value={status} onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
        <input value={priority} onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
        <button onClick={updateTaskTitle}>updateTaskTitle</button>
      </div>
    </div>
  )
}
