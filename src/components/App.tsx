import * as React from 'react'
import AddTodoForm from './AddTodoForm'
import TodosList from './TodosList'

class App extends React.Component {
  render() {
    return (
      <div className="todoapp">
        <header>
          <h1>Todos</h1>
          <AddTodoForm />
        </header>
        <TodosList />
      </div>
    );
  }
}

export default App;
