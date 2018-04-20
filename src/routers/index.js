/**
 * 整合所有子路由
 */

import _router from'koa-router';

import api from './api';

const router = _router();



router.use('/api', api.routes(), api.allowedMethods());

module.exports = router;