import type { Component, Accessor } from 'solid-js';
import { createSignal } from 'solid-js';

import { v1 as uuid } from 'uuid';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const Form: Component<{
  addTodo: (todo: Todo) => void;
}> = (props) => {
  const [title, setTitle] = createSignal('');

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleClickButton = () => {
    const id = uuid();
    props.addTodo({ title, id, isComplete: false });
    setTitle('');
  };

  return (
    <div className="add-items d-flex">
      <input
        type="text"
        className="form-control todo-list-input"
        placeholder="What do you need to do today?"
        value={title()}
        onChange={handleChange}
      />
      <button
        onClick={handleClickButton}
        className="add btn btn-primary font-weight-bold todo-list-add-btn"
      >
        Add
      </button>
    </div>
  );
};

export default Form;