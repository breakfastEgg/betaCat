'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,io } = app;
  router.get('/', controller.home.index);
  router.get('/login',controller.user.login);
  router.get('/signup',controller.user.signup);

  
  io.of('/').route('server', io.controller.home.server);
  io.of('/').route('exchange', io.controller.chat.exchange);
};
