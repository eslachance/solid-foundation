import { Component, createEffect } from 'solid-js';

import { createSignal, onMount, on } from 'solid-js';

import NavigationBar from './Components/Navigation';
import List from './Components/List'
import Search from './Components/Search'

import styles from './App.module.css';

type Todo = {
    userId: number
    id: number
    title: string
    completed: boolean
}

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

  const toggleTodo = (id: number) => {
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

  const deleteTodo = (id: number) => {
    console.log(id)
    fetch('/api/todos/'+id, { method: 'DELETE' })
      .then(() => {
        setTodos(prev => prev.filter(item => item.id !== id));
      })
      .catch(e => console.log(e))
  }

  return (
    <>
      <div class={styles.App}>
        <NavigationBar />
        <h1>Simple SolidJS Todo Example</h1>
        <p>
          A dead-simple todo example without fluff for comprehension of the
          basics.
        </p>
        <p>Filter: {searchTerm}</p>
        <div class="container">
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <List
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </>
  );
};

export default App;
