
import { v1 } from 'uuid';
import { AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistActionType,
  todolistid1,
  todolistid2
} from './todolists-reducer';
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI
} from '../api/todolists-api';
import { AppRootType, AppThunk } from './store';
import { TasksStateType } from '../TodoListLists';

export type TasksActionType =
  ReturnType<typeof removeTaskAC> |
  ReturnType<typeof addTaskAC> |
  ReturnType<typeof changeTaskAC> |
  ReturnType<typeof setTasksAC> |
  AddTodolistActionType |
  RemoveTodolistActionType |
  SetTodolistActionType

const initialState: TasksStateType = {
  [todolistid1]: [
    {
      id: v1(),
      title: 'CSS',
      status: TaskStatuses.Completed,
      todoListId: todolistid1,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      startDate: '',
      priority: TaskPriorities.Middle
    },
    {
      id: v1(),
      title: 'JS',
      status: TaskStatuses.Completed,
      todoListId: todolistid1,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      startDate: '',
      priority: TaskPriorities.Middle
    },
    {
      id: v1(),
      title: 'React',
      status: TaskStatuses.New,
      todoListId: todolistid1,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      startDate: '',
      priority: TaskPriorities.Middle
    },
    {
      id: v1(),
      title: 'Redux',
      status: TaskStatuses.New,
      todoListId: todolistid1,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      startDate: '',
      priority: TaskPriorities.Middle
    }
  ],
  [todolistid2]: [
    {
      id: v1(),
      title: 'Cream-cheese',
      status: TaskStatuses.Completed,
      todoListId: todolistid2,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      startDate: '',
      priority: TaskPriorities.Middle
    },
    {
      id: v1(),
      title: 'Flour',
      status: TaskStatuses.Completed,
      todoListId: todolistid2,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      startDate: '',
      priority: TaskPriorities.Middle
    },
    {
      id: v1(),
      title: 'Butter',
      status: TaskStatuses.New,
      todoListId: todolistid2,
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      startDate: '',
      priority: TaskPriorities.Middle
    }
  ]
};

export const taskReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
    case 'ADD-TASK':
      return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
    case 'CHANGE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? { ...t, ...action.model } : t)
      };
    case 'ADD-TODOLIST':
      return { ...state, [action.todolist.id]: []};
    case 'REMOVE-TODOLIST':
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    case 'SET-TODOLIST': {
      const stateCopy = { ...state };
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    };
    case 'SET-TASKS':
      return { ...state, [action.todolistId]: action.tasks} 
    default:
      return state;
  }
};

export const removeTaskAC = (todolistId: string, taskId: string) =>
  ({ type: 'REMOVE-TASK', todolistId, taskId } as const);
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const);
export const changeTaskAC = (todolistId: string, taskId: string, model: ModelDomainType) =>
  ({ type: 'CHANGE-TASK', todolistId, taskId, model } as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
  ({ type: 'SET-TASKS', tasks, todolistId } as const);

export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
  todolistsAPI.getTasks(todolistId)
    .then(res => {
      dispatch(setTasksAC(res.data.items, todolistId));
    });
};

export const deleteTasksTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
  todolistsAPI.deleteTask(todolistId, taskId)
    .then(res => {
      dispatch(removeTaskAC(todolistId, taskId));
    });
};

export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
  todolistsAPI.createTask(todolistId, title)
    .then(res => {
      dispatch(addTaskAC(res.data.data.item));
    });
};

export type ModelDomainType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export const changeTaskTC = (todolistId: string, taskId: string, domainModel: ModelDomainType): AppThunk =>
  (dispatch, getState: () => AppRootType) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);
    if (!task) {
      throw new Error('task not found in the state');
      console.warn('task not found in the state');
      return;
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
      });
  };

