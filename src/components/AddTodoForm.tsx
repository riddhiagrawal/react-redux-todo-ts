import * as React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todos';
import { FormEvent } from 'react';
interface Props {
  handleSubmit: (value: string) => void;
}
interface State {
  value: string;
}
class AddTodoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '' }; // Value is empty by default
    this._updateValue = this._updateValue.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _updateValue(value: string) {
    this.setState({ value });
  }

  _handleSubmit(e?: FormEvent<any>) {
    if (e) {
      e.preventDefault();
    }
    if (!this.state.value.trim()) {
      return;
    }
    this.props.handleSubmit(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    const { value } = this.state;
    const { _updateValue, _handleSubmit } = this;
    return (
      <form onSubmit={_handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => _updateValue(e.target.value)}
        />
        <button type="submit">Add todo !</button>
      </form>
    );
  }
}

export default connect<any, any, any>(
  null,
  {
    handleSubmit: addTodo
  }
)(AddTodoForm);
