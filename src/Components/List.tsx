import type { Component, Accessor } from 'solid-js';

import { For } from 'solid-js';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const List: Component<{
  todos: Accessor<Todo[]>;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}> = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <div class="list-wrapper">
      <ul class="d-flex flex-column-reverse todo-list">
        <For each={todos().slice(0, 20)}>
          {(todo, i) => (
            <li>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    className="checkbox"
                    checked={todo.completed}
                    type="checkbox"
                    onClick={() => toggleTodo(todo.id)}
                  />
                  {todo.title}
                  <i className="input-helper" />
                </label>
              </div>
              <i
                className="remove mdi mdi-close-circle-outline"
                onClick={() => deleteTodo(todo.id)}
              />
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default List;
