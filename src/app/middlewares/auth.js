import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token not provided' });
  }
  const [, token] = authorization.split(' ');

  try {
    const tokenDecoded = await jwt.decode(token);

    const { companyId } = tokenDecoded;

    req.companyId = companyId;

    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
