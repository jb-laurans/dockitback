import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { generateToken, authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, type, company } = req.body;

    // Validation
    if (!name || !email || !password || !type) {
      return res.status(400).json({ 
        error: 'Name, email, password, and type are required' 
      });
    }

    if (!['charterer', 'shipowner'].includes(type)) {
      return res.status(400).json({ 
        error: 'Type must be either charterer or shipowner' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long' 
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      type,
      company: company || ''
    });

    const { password: _pw, ...userWithoutPassword } = user;
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Email already exists') {
      return res.status(409).json({ error: error.message });
    }
    next(error);
  }
});

// Login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findByEmail(email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { password: _pw, ...userWithoutPassword } = user;
    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    next(error);
  }
});

// Logout (client-side token removal, but we can provide a response)
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logout successful' });
});

// Get current user
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ user: req.user });
});

// Get current user's dashboard data
router.get('/dashboard/shipowner', authenticateToken, async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const dashboardData = await User.getDashboard(req.user.id);
    res.json(dashboardData);
  } catch (error) {
    next(error);
  }
});

export default router; 