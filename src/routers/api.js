/**
 * restful api 子路由
 */

const router = require('koa-router')();
const apiController = require('../controllers/api');

const routers = router
  .get('/', apiController.exp);
 
  
module.exports = routers