"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  const [, token] = authorization.split(' ');

  try {
    const tokenDecoded = await _jsonwebtoken2.default.decode(token);

    const { companyId } = tokenDecoded;

    req.companyId = companyId;

    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
