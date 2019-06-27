import * as React from 'react';
import TodosList from './TodosList';
import configureStore from 'redux-mock-store';
import { ActionTypes } from '../actions/todos';
import { mount } from 'enzyme';

describe('TodosList', () => {
  it('should show empty when no todos', () => {
    const mockStore = configureStore();
    const initialState = {
        todos: {
            todos: []
        }
    }
    const store = mockStore(initialState);
    const component = mount(<TodosList store={store} />);

    expect(component.find('ul li').length).toBe(0)
  })

  it('should show list of all todos when todos exist', () => {
    const mockStore = configureStore();
    const todo = {
        id: 1,
        name: 'Take your dog for a walk',
        done: false
    }
    const initialState = {
        todos: {
            todos: [todo]
        }
    }
    const store = mockStore(initialState);
    const component = mount(<TodosList store={store} />);

    expect(component.find('ul li').length).toBe(1)
    expect(component.find('ul li').text()).toBe(todo.name);
  })

  it('should show done todo as completed', () => {
    const mockStore = configureStore();
    const todo = {
        id: 1,
        name: 'Take your dog for a walk',
        done: false
    }
    const completedTodo = {
      id: 2,
      name: 'Hug your dog, tell him he is a good boy',
      done: true
    }
    const initialState = {
        todos: {
            todos: [todo, completedTodo]
        }
    }
    const store = mockStore(initialState);
    const component = mount(<TodosList store={store} />);

    expect(component.find('ul li').length).toBe(2)
    expect(component.find('li.completed').length).toBe(1)
    expect(component.find('li.completed').text()).toBe(completedTodo.name);
  })

  it('should mark todo as done when user clicks on it', () => {
    const todo = {
      name: 'Eat an apple',
      id: 1,
      done: false
    }
    const initialState = {
      todos: {
        todos: [todo]
      }
    }
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const component = mount(<TodosList store={store} />);

    expect(component.find('li').hasClass('completed')).toBe(false)
    component.find('li').simulate('click');

    const actions = store.getActions();
    const expectedPayload = {
      type: ActionTypes.COMPLETE_TODO,
      payload: {
          id: todo.id
      }
    };
    expect(actions).toEqual([expectedPayload]);
  })

  it('should do nothing when user clicks on a completed todo', () => {
    const todo = {
      name: 'Eat an apple',
      id: 1,
      done: true
    }
    const initialState = {
      todos: {
        todos: [todo]
      }
    }
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const component = mount(<TodosList store={store} />);

    component.find('li').simulate('click');

    const actions = store.getActions();
    expect(actions).toEqual([]);
  })

})