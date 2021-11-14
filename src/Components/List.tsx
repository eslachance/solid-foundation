import type { Component, Accessor } from 'solid-js';
import { For } from 'solid-js';
import IconDelete from '~icons/mdi/delete';
import { marked } from 'marked';

import { Todo } from '../types';

const List: Component<{
  todos: Accessor<Todo[]>;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}> = (props) => {
  return (
    <div class="list-wrapper">
      <ul class="d-flex flex-column-reverse todo-list">
        <For each={props.todos().slice(0, 20)}>
          {(todo, i) => (
            <li>
              <div class="form-check">
                <label class="form-check-label">
                  <input
                    class="checkbox"
                    checked={todo.completed}
                    type="checkbox"
                    onClick={() => props.toggleTodo(todo.id)}
                  />
                  <span innerHTML={marked.parse(todo.title)} />
                  <i class="input-helper" />
                </label>
              </div>
              <IconDelete
                class="remove mdi mdi-close-circle-outline"
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
