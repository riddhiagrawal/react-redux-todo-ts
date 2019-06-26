import * as React from 'react';
import AddTodoForm from './AddTodoForm';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { ActionTypes } from '../actions/todos';

const mockStore = configureStore();

describe('AddTodoForm', () => {
  it('should add Todo when the user submits todo text', () => {
    const store = mockStore();
    const component = shallow(<AddTodoForm store={store} />).dive();

    const todoItem = 'Eat Veggies';
    component.find('input').simulate('change', { target: { value: todoItem } });
    component.find('form').simulate('submit');

    const actions = store.getActions();
    const expectedPayload = {
      type: ActionTypes.ADD_TODO,
      payload: {
        todo: {
          id: 0,
          name: todoItem,
          done: false
        }
      }
    };
    expect(actions).toEqual([expectedPayload]);
  });

  it('should not add Todo when the user submits no text ', () => {
    const store = mockStore();
    const component = shallow(<AddTodoForm store={store} />).dive();

    component.find('form').simulate('submit');

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it('should not add Todo when the user submits blank text ', () => {
    const store = mockStore();
    const component = shallow(<AddTodoForm store={store} />).dive();

    component.find('input').simulate('change', { target: { value: '  ' } });
    component.find('form').simulate('submit');

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  it('should clear the input after adding a todo', () => {
    const store = mockStore();
    const component = shallow(<AddTodoForm store={store} />).dive();

    const todoItem = 'Eat Veggies';
    component.find('input').simulate('change', { target: { value: todoItem } });
    component.find('form').simulate('submit');

    expect(component.find('input').props().value).toEqual('')
  })
});
