"use strict";

var _streamChat = require("stream-chat");

var _chalk = _interopRequireDefault(require("chalk"));

var _config = require("../../utils/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function chatAuth(ctx) {
  try {
    const {
      apiKey,
      apiSecret,
      apiBaseUrl
    } = await (0, _config.credentials)(ctx);
    const chatClient = new _streamChat.StreamChat(apiKey, apiSecret);
    chatClient.setBaseURL(apiBaseUrl);
    return chatClient;
  } catch (error) {
    ctx.error(`Authentication required. Use the command ${_chalk.default.green.bold('stream config:set')} to authenticate.`, {
      exit: 1
    });
  }
}

module.exports.chatAuth = chatAuth;