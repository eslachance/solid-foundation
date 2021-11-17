import { Component, createEffect } from 'solid-js';
import { createSignal, on } from 'solid-js';

import List from './Components/List'
import Form from './Components/Form';
import Header from './Components/Header';

import { useStore } from './store';

const App: Component = () => {
  const [searchTerm, setSearchTerm] = createSignal<string>('');

  const [state, { setAllTodos }] = useStore();
  createEffect(on(searchTerm, (v) => {
    const endpoint =
      v && v.length > 0 ? `/api/search/${encodeURI(v)}` : '/api/todos';

      fetch(endpoint)
        .then((r) => r.json())
        .then(setAllTodos);
  }));

  return (
    <>
      <Header />
      <Show when={state.auth.isLoggedIn}>
        <div class="container">
          <div class="card px-3">
            <div class="card-body">
              <h4 class="card-title">Your Todo List</h4>
              <Form />
              <List />
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};

export default App;
