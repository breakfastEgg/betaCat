'use strict';

const BaseController = require('./base.js');

class UserController extends BaseController{
	constructor(ctx) {
    super(ctx)

    this.UserLoginFormat = {
      userName: { type: 'string', required: true, allowEmpty: false },
      password: { type: 'string', required: true, allowEmpty: false }
    }

    this.UserResetPswFormat = {
      password: { type: 'password', required: true, allowEmpty: false, min: 6 },
      oldPassword: { type: 'password', required: true, allowEmpty: false, min: 6 }
    }

    this.UserUpdateFormat = {
      userName: { type: 'string', required: true, allowEmpty: false },
      realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/}
    }

    this.UserSignupFormat = {
      userName: {type: 'string', required: true, allowEmpty: false, format: /^[0-9]{11}$/},
      password: {type: 'password', required: true, allowEmpty: false, min: 6},
      // realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/}
    }
  }

  //用户注册
  async signup(){
    const {ctx, service} = this;
    // ctx.validate(this.UserSignupFormat);
    const user = Object.assign(ctx.request.body,ctx.request.query);
    const res = await service.user.signup(user);
    this.success(res);
  }
  // 用户登入
  async login() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.UserLoginFormat);
    // 组装参数
    const user = ctx.request.body || ctx.request.query || {}
    // 调用 Service 进行业务处理
    const res = await service.user.login(user)
    // 设置响应内容和响应状态码
    this.success(res);
  }

  // 用户登出
  async logout() {
    const { ctx, service } = this
    // 调用 Service 进行业务处理
    await service.userAccess.logout()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }
  
  // 修改密码
  async resetPsw() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.UserResetPswFormat)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.userAccess.resetPsw(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 获取用户信息
  async current() {
    const { ctx, service } = this
    const res = await service.userAccess.current()
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  // 修改基础信息
  async resetSelf() {
    const {ctx, service} = this
    // 校验参数
    ctx.validate(this.UserUpdateFormat)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用Service 进行业务处理
    await service.userAccess.resetSelf(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  // 修改头像
  async resetAvatar() {
    const { ctx, service } = this
    const stream = await ctx.getFileStream()
    const filename = path.basename(stream.filename)
    const extname = path.extname(stream.filename).toLowerCase()
    const attachment = new this.ctx.model.Attachment
    attachment.extname = extname
    attachment.filename = filename
    attachment.url = `/uploads/avatar/${attachment._id.toString()}${extname}`
    const target = path.join(this.config.baseDir, 'app/public/uploads/avatar', `${attachment._id.toString()}${attachment.extname}`)
    const writeStream = fs.createWriteStream(target)
    try {
      await awaitWriteStream(stream.pipe(writeStream))
      // 调用 Service 进行业务处理
      await service.userAccess.resetAvatar(attachment)
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }
}

module.exports = UserController;