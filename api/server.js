/* eslint-disable @typescript-eslint/no-require-imports */
const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Adicione isso para que o Vercel entenda o roteamento
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  }),
);
server.use(router);

module.exports = server;
