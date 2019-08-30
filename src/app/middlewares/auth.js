/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

import { promisify } from 'util';

import authConig from '../../config/auth';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConig.secret);

    request.userId = decoded.id;

    return next();
  } catch (err) {
    response.status(401).json({ error: 'Token invalid' });
  }
};
