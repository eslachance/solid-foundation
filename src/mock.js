import { createServer, Model } from 'miragejs';

/*

This file is for demonstration purposes only
SolidJS doesn't need or use miragejs, this is just 
to simulate a backend API that responds to Todo creation,
deletion, and update.

*/

export default function () {
  createServer({
    models: {
      todos: Model,
    },

    namespace: 'api',

    seeds(server) {
      jsondata.forEach((data) => server.create('todo', data));
    },

    routes() {
      this.timing = 50;
      this.namespace = 'api';

      this.get('/todos', (schema) => {
        return schema.todos.all();
      });

      this.get('/search/:term', (schema, request) => {
        let term = request.params.term;
        // todo: use better search here
        const results = schema.todos.where((todo) => todo.title.includes(term));
        return results;
      });

      this.post('/todos', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.todos.create(attrs);
      });

      this.delete('/todos/:id', (schema, request) => {
        let id = request.params.id;
        return schema.todos.findBy({ id }).destroy();
      });

      this.get('/todos/toggle/:id', (schema, request) => {
        let id = request.params.id;
        const todo = schema.todos.findBy({ id });
        todo.completed = !todo.completed;
        todo.save();
        return todo;
      });
    },
  });
}

const jsondata = [
  {
    id: 1,
    title: 'Visit [SolidJS](https://solidjs.com/) and get started!',
    completed: false,
  },
  {
    id: 2,
    title: 'Fork this repository and get to coding!',
    completed: false,
  },
  {
    id: 3,
    title: 'Join the [Discord](https://discord.gg/solidjs) community for help!',
    completed: false,
  },
];
