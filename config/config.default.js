'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525053348856_7989';

  // add your config here
  config.middleware = [ 'errHandle' ];

  config.sequelize = {
	  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
	  database: 'betacat',
	  host: 'localhost',
	  port: '3306',
	  username: 'root',
	  password: '',
	};

	config.io = {
		init: {
      wsEngine: 'uws',
    },
    namespace: {
      '/': {
        connectionMiddleware: [
          'auth',
        ],
        packetMiddleware: [],
      },
      '/play': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
	};

  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG'
  };

  return config;
};
