const {Controller} = require('egg');

class BaseController extends Controller{

	
	get user(){
		return this.ctx.session.user;
	}

	success(data) {
    this.ctx.body = {
      success: true,
      code: 1,
      data,
    };
	}

	notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
	}

	fail(code, data) {
		this.ctx.body = {
      success: false,
      code,
      data,
    };
	}
}

module.exports = BaseController;