import express from 'express';
import { User } from '../models/User.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
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

    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User created successfully',
      user,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message === 'Email already exists') {
      return res.status(409).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    const user = await User.findByEmail(email.toLowerCase());
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await User.verifyPassword(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Update profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, company } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const updatedUser = await User.updateProfile(req.user.id, {
      name,
      company: company || ''
    });

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/dashboard/shipowner', authenticateToken, async (req, res) => {
  try {
    const dashboardData = await User.getDashboard(req.user.id);
    console.log(dashboardData);
    res.json(dashboardData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;