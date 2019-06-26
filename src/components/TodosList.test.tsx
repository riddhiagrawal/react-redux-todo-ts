import * as React from 'react';
import TodosList from './TodosList';
import configureStore from 'redux-mock-store';
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
    expect(component.find('ul').contains(<li>{todo.name}</li>)).toBe(true);
  })
})