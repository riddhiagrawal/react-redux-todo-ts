import * as React from 'react'
import Todo from '../models/Todo'
import { connect } from 'react-redux'
import { getTodos } from '../selectors/todos'
import { State } from '../reducers'

interface Props {
  todos: Todo[]
}
class TodosList extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { todos } = this.props
    return (
      <ul>
        {
          todos.map(todo => (
            <li
              key={todo.id}
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

export default connect<any, any, any>(mapStateToProps)(TodosList)