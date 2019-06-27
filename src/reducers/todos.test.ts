import { reducer, initialState } from './todos';
import { ActionTypes } from '../actions/todos';

describe('Todo Reducer', () => {
  it('should be able to add todo when there is no todos', () => {
    const todo = {
      id: 1,
      name: 'Take your dog for a walk',
      done: false
    };
    const finalState = reducer(initialState, {
      type: ActionTypes.ADD_TODO,
      payload: {
        todo: todo
      }
    });
    expect(finalState).toEqual({ todos: [todo] });
  });

  it('should be able to add todo to an existing list of todos', () => {
    const todo = {
      id: 1,
      name: 'Take your dog for a walk',
      done: false
    };
    const initialStateWithTodos = {
      todos: [todo, todo, todo]
    };
    const finalState = reducer(initialStateWithTodos, {
      type: ActionTypes.ADD_TODO,
      payload: {
        todo: todo
      }
    });
    expect(finalState).toEqual({ todos: [todo, todo, todo, todo] });
  });

  it('should be able to completed todo', () => {
    const todo = {
      id: 1,
      name: 'Take your dog for a walk',
      done: false
    };
    const initialStateWithTodos = {
      todos: [todo]
    };
    const finalState = reducer(initialStateWithTodos, {
      type: ActionTypes.COMPLETE_TODO,
      payload: {
        id: todo.id
      }
    });
    expect(finalState).toEqual({ todos: [{ ...todo, done: true }] });
  });
});
