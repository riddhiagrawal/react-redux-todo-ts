import Todo from '../models/Todo'
 
let nextId = 0

export enum ActionTypes {
  ADD_TODO = '[todos] ADD_TODO'
}

export interface AddTodoAction { type: ActionTypes.ADD_TODO, payload: { todo: Todo } }

export function addTodo(name: string): AddTodoAction {

  return {
    type: ActionTypes.ADD_TODO,
    payload: {
      todo: {
        id: nextId++,
        name: name,
        done: false
      }
    }
  }
}

export type Action = AddTodoAction