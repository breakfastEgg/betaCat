const crypto = require('crypto');

module.exports = {
	Hash: function(data, algorithm) {
		const hash = crypto.createHash(algorithm);
		hash.update(data);
		return hash.digest('hex');
	},

	verify: function (data, algorithm, hashData) {
		return this.Hash(data, algorithm) == hashData;
	},

	parseMsg(action, payload = {}, metadata = {}) {
		const meta = Object.assign({}, {
		  timestamp: Date.now(),
		}, metadata);

		return {
		  meta,
		  data: {
		    action,
		    payload,
		  },
		};
	},
}