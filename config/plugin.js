'use strict';

// had enabled by egg
// exports.static = true;

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize'
};

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};