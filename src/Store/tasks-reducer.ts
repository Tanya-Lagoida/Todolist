import { TasksStateType } from '../AppWithRedux';
import { v1 } from 'uuid';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
  todolistid1,
  todolistid2
} from './todolists-reducer';
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI
} from '../api/todolists-api';
import { Dispatch } from 'redux';
import { AppRootType } from './store';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  todolistId: string
  taskId: string
}
type AddTaskActionType = {
  type: 'ADD-TASK'
  task: TaskType
}

export type ChangeTaskActionType = {
  type: 'CHANGE-TASK'
  taskId: string
  todolistId: string
  model: ModelDomainType
}
/*export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  todolistId: string
  status: TaskStatuses
}*/

export type SetTasksActionType = {
  type: 'SET-TASKS'
  tasks: Array<TaskType>
  todolistId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskActionType | AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType

const initialState: TasksStateType = {
  [todolistid1]: [
    { id: v1(), title: 'CSS', status: TaskStatuses.Completed, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
    { id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
    { id: v1(), title: 'React', status: TaskStatuses.New, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
    { id: v1(), title: 'Redux', status: TaskStatuses.New, todoListId: todolistid1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle }
  ],
  [todolistid2]: [
    { id: v1(), title: 'Cream-cheese', status: TaskStatuses.Completed, todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
    { id: v1(), title: 'Flour', status: TaskStatuses.Completed, todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle },
    { id: v1(), title: 'Butter', status: TaskStatuses.New, todoListId: todolistid2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Middle }
  ]
}

export const taskReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return { ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }
    };
    case 'ADD-TASK': {
      const newTask = action.task
      return { ...state,
        [action.task.todoListId]: [newTask, ...state[action.task.todoListId]] }
    };
    case 'CHANGE-TASK': {
      return { ...state,
        [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? { ...t, ...action.model } : t)
      }
    };
    /*case 'CHANGE-TASK-TITLE': {
      return { ...state, [action.todolistId]: state[action.todolistId]
        .map(t => t.id === action.taskId ? { ...t, title: action.title } : t)
      }
    };*/
    case 'ADD-TODOLIST': {
      const stateCopy = {...state}
      stateCopy[action.todolist.id] = []
      return stateCopy
    };
    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    };
    case 'SET-TODOLIST': {
      const stateCopy = {...state}
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    };
    case 'SET-TASKS': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = action.tasks
      return stateCopy
    };
    default:
      return state;
  }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
  return { type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: 'ADD-TASK', task }
}

export const changeTaskAC = ( todolistId: string, taskId: string, model: ModelDomainType):ChangeTaskActionType => {
  return {type: 'CHANGE-TASK', todolistId, taskId, model}
}

/*export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string ): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS',taskId, status, todolistId}
}*/
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string ): SetTasksActionType => {
  return {type: 'SET-TASKS',tasks: tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    todolistsAPI.getTasks(todolistId)
      .then(res => {
        dispatch(setTasksAC(res.data.items, todolistId));
      });
  };
}

export const deleteTasksTC = (todolistId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
      .then(res => {
        dispatch(removeTaskAC(todolistId, taskId));
      })
  }
}

export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
      .then(res => {
        dispatch(addTaskAC(res.data.data.item));
      })

  }
}
export type ModelDomainType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export const changeTaskTC = (todolistId: string, taskId: string, domainModel: ModelDomainType) => {
  return (dispatch: Dispatch, getState: () => AppRootType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      throw new Error('task not found in the state')
      console.warn('task not found in the state')
      return
    }

    todolistsAPI.updateTask(todolistId, taskId, {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      title: task.title,
      ...domainModel
    })
      .then(res => {
        dispatch(changeTaskAC(todolistId, taskId, domainModel));
      })

  }
}


