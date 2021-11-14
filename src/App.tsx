import { Component, createEffect } from 'solid-js';
import { createSignal, on } from 'solid-js';

import List from './Components/List'
import Form from './Components/Form';

import { Todo } from './types'

const App: Component = () => {
  const [todos, setTodos] = createSignal<Todo[]>([]);
  const [searchTerm, setSearchTerm] = createSignal<string>('');

  createEffect(on(searchTerm, (v) => {
    const endpoint =
      v && v.length > 0 ? `/api/search/${encodeURI(v)}` : '/api/todos';

      fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setTodos(data.todos);
      });
  }));

  const toggleTodo = (id: string) => {
    fetch('/api/todos/toggle/'+id)
      .then(res => res.json())
      .then(changes => {
        console.log(changes);
        // This is because of miragejs' response format, meh.
        const todo = changes.todos;
        setTodos(prev => prev.map(item => item.id === id ? todo : item))
      })
      .catch(e => console.log(e))
  }

  const deleteTodo = (id: string) => {
    console.log(id);
    fetch('/api/todos/' + id, { method: 'DELETE' })
      .then(() => {
        setTodos((prev) => prev.filter((item) => item.id !== id));
      })
      .catch((e) => console.log(e));
  };

  const addTodo = (newTodo: Todo) => {
    setTodos((existingTodos) => existingTodos.concat(newTodo));
  };

  return (
    <>
      <div>
        <div class="card px-3">
          <div class="card-body">
            <h4 class="card-title">Redux Todo list</h4>
            <Form addTodo={addTodo} />
            <List
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
