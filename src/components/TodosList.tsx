import * as React from 'react'
import Todo from '../models/Todo'
import { connect } from 'react-redux'
import { getTodos } from '../selectors/todos'
import { State } from '../reducers'
import { completeTodo } from '../actions/todos'

interface Props {
  todos: Todo[],
  triggerCompleteTodo: (id: Number) => void
}

class TodosList extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { todos, triggerCompleteTodo } = this.props
    const onTodoClicked = (todo: Todo) => {
      if (!todo.done) {
        triggerCompleteTodo(todo.id)
      }
    }
    return (
      <ul>
        {
          todos.map(todo => (
            <li
              key={todo.id}
              onClick={() => { onTodoClicked(todo) }}
              className={todo.done ? 'completed' : ''}
            >
              {todo.name}
            </li>)
          )
        }
      </ul>
    )
  }
}

const mapStateToProps = (state: State) => ({
  todos: getTodos(state)
})

const mapDispatchToProps = {
  triggerCompleteTodo: completeTodo
}

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TodosList)