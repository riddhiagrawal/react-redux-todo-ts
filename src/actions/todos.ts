import Todo from '../models/Todo'
 
let nextId = 0

export enum ActionTypes {
  ADD_TODO = '[todos] ADD_TODO',
  COMPLETE_TODO = '[todos] COMPLETE_TODO'
}

export interface AddTodoAction { type: ActionTypes.ADD_TODO, payload: { todo: Todo } }
export interface CompleteTodoAction { type: ActionTypes.COMPLETE_TODO, payload: {id: Number} }

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

export function completeTodo(id: Number): CompleteTodoAction {
  return {
    type: ActionTypes.COMPLETE_TODO,
    payload: {
      id: id
    }
  }
}

export type Action = AddTodoAction | CompleteTodoAction