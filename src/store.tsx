import { createSignal, createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store'

const AppContext = createContext();
import { Todo } from './types';

export const AppProvider = (props) => {
  const [state, setState] = createStore({ 
    auth: {
      isLoggedIn: false,
      username: '',
    },
    todos: [] as Todo[]
   });

  const store = [
    state,
    {
      login: (username: string, password: string) => {
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setState('auth', { isLoggedIn: true, username });
            } else {
              console.error(res.error);
            }
          });

      },
      logout: () => {
        fetch('/api/logout')
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              setState('auth', { isLoggedIn: false, username: '' });
            } else {
              console.error(res.error);
            }
          });
      },
      getUserInfo: () => {
        fetch('/api/me').then(res => res.json())
          .then(res => {
            if (res.success) {
              setState('auth', { isLoggedIn: true, username: res.username });
            } else {
              console.error(res.error);
            }
          })
      },
      setAllTodos: (todos: Todo[]) => {
        setState('todos', todos);
      },
      addTodo: (newTodo: Todo) => {
        fetch('/api/todos', {
          method: 'POST',
          body: JSON.stringify(newTodo),
        })
          .then(() => {
            setState('todos', (existingTodos) => existingTodos.concat(newTodo));
          })
          .catch((e) => console.log(e));
      },
      deleteTodo: (id: string) => {
        console.log(id);
        fetch('/api/todos/' + id, { method: 'DELETE' })
          .then(() => {
            setState('todos', (prev) =>
              prev.filter((item: Todo) => item.id !== id),
            );
          })
          .catch((e) => console.log(e));
      },
      toggleTodo: (id: string) => {
        fetch('/api/todos/toggle/' + id)
          .then((res) => res.json())
          .then((todo) => {
            setState('todos', (prev) =>
              prev.map((item: Todo) => (item.id === id ? todo : item)),
            );
          })
          .catch((e) => console.log(e));
      },
    },
  ];

  return (
    <AppContext.Provider value={store}>
      {props.children}
    </AppContext.Provider>
  );
}

export const useStore = () => useContext(AppContext);
