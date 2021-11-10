import type { Component, Accessor } from 'solid-js';
import { For } from 'solid-js';
import IconDelete from '~icons/mdi/delete';
import { marked } from 'marked';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const List: Component<{
  todos: Accessor<Todo[]>;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}> = (props) => {
  
  return (
    <div class="list-wrapper">
      <ul class="d-flex flex-column-reverse todo-list">
        <For each={props.todos().slice(0, 20)}>
          {(todo, i) => (
            <li>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    className="checkbox"
                    checked={todo.completed}
                    type="checkbox"
                    onClick={() => props.toggleTodo(todo.id)}
                  />
                  <span innerHTML={marked.parse(todo.title)} />
                  <i className="input-helper" />
                </label>
              </div>
              <IconDelete
                className="remove mdi mdi-close-circle-outline"
                onClick={() => props.deleteTodo(todo.id)}
              />
              <i />
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default List;
