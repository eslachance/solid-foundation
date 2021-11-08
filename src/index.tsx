import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import mockserver from './mock';
mockserver();

render(() => <App />, document.getElementById('root') as HTMLElement);
