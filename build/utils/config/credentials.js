"use strict";

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const emoji = require('node-emoji');

const chalk = require('chalk');

async function credentials(ctx) {
  const config = _path.default.join(ctx.config.configDir, 'config.json');

  try {
    if (!(await _fsExtra.default.pathExists(config))) {
      await _fsExtra.default.outputJson(config, {
        name: '',
        email: '',
        apiKey: '',
        apiSecret: '',
        apiBaseUrl: 'https://chat-us-east-1.stream-io-api.com',
        environment: 'production',
        telemetry: true
      });
    }

    const {
      name,
      email,
      apiKey,
      apiSecret,
      apiBaseUrl,
      environment,
      telemetry
    } = await _fsExtra.default.readJson(config);

    if (!name || !email || !apiKey || !apiSecret || !apiBaseUrl || !environment || !telemetry) {
      console.warn(`Credentials not found. Run the command ${chalk.bold('stream config:set')} to generate a new Stream configuration file.`, emoji.get('warning'));
      ctx.exit(0);
    }

    return {
      name,
      email,
      apiKey,
      apiSecret,
      apiBaseUrl,
      environment,
      telemetry
    };
  } catch (error) {
    ctx.error(error || 'A Stream CLI error has occurred.', {
      exit: 1
    });
  }
}

module.exports.credentials = credentials;