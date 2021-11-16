import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { v1 as uuid } from 'uuid';

import { useStore } from '../store';

const Form: Component = (props) => {
  const [title, setTitle] = createSignal('');

  const [, { addTodo }] = useStore();

  const handleChange = (event: Event) => {
    setTitle((event.target as HTMLTextAreaElement).value);
  };

  const handleClickButton = () => {
    const id = uuid();
    addTodo({ title: title(), id, completed: false });
    setTitle('');
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      event.preventDefault(); 
      handleClickButton();
    }
  };

  return (
    <div className="add-items d-flex">
      <input
        type="text"
        className="form-control todo-list-input"
        placeholder="What do you need to do today?"
        value={title()}
        onInput={handleChange}
        onKeyPress={handleKeyPress}
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