import { createSignal, Show } from 'solid-js';
import type { Component } from 'solid-js';

import { useStore } from '../store';

const Login: Component = () => {
  const [, { login }] = useStore();
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [showPopup, setShowPopup] = createSignal(false);

  const toggle = () => {
    setShowPopup((a) => !a);
  };

  const tryLogin = () => {
    login(username(), password());
  };

  return (
    <div class="container d-flex flex-wrap justify-content-center">
      <Show when={showPopup()} fallback={(
        <>
          <button
            type="button"
            onClick={toggle}
            class="btn btn-outline-primary me-2"
          >
            Login
          </button>
          <button type="button" class="btn btn-primary">
            Sign-up
          </button>
        </>
      )}>
          <input
            type="text"
            name="username"
            value={username()}
            class="form-control"
            placeholder="Username..."
            aria-label="Username"
            onInput={(event) =>
              setUsername((event.target as HTMLTextAreaElement).value)
            }
          />
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="Password..."
            aria-label="Password"
            value={password()}
            onInput={(event) =>
              setPassword((event.target as HTMLTextAreaElement).value)
            }
          />
          <button type="button" class="btn btn-primary" onClick={tryLogin}>
            Login
          </button>
      </Show>
    </div>
  );
};

export default Login;
