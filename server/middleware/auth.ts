import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserType } from '../models/User';

export interface AuthRequest extends Request {
  user?: UserType;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    type JwtPayload = { userId: number };
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const generateToken = (userId: number) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
  );
}; 