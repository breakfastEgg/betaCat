import Koa from 'koa';
import socket from 'socket.io';
import routers from './routers/index.js';
import socketRouter from './routers/socketRouter.js';

const app = new Koa();

// support socket.io
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

io.set('heartbeat interval', 60000);
io.set('heartbeat timeout', 5000);

app.use(async (ctx, next) => {
	ctx.body = 'Hello World'; 
	next();
});

app.use(routers.routes()).use(routers.allowedMethods());

io.on('connection', socketRouter);

app.listen(3000);

console.log('server listening 3000');
