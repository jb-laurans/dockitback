import express from 'express';
import { Ship } from '../models/Ship.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all ships with optional filters
router.get('/', authenticateToken, async (req, res) => {
  try {
    const filters = {
      type: req.query.type,
      minDwt: req.query.minDwt ? parseInt(req.query.minDwt) : null,
      maxDwt: req.query.maxDwt ? parseInt(req.query.maxDwt) : null,
      port: req.query.port
    };

    const ships = await Ship.findAll(filters);
    res.json({ ships });
  } catch (error) {
    console.error('Get ships error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get ship by ID
router.get('/:id', async (req, res) => {
  try {
    const ship = await Ship.findById(req.params.id);
    
    if (!ship) {
      return res.status(404).json({ error: 'Ship not found' });
    }

    res.json({ ship });
  } catch (error) {
    console.error('Get ship error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create ship (shipowners only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'shipowner') {
      return res.status(403).json({ 
        error: 'Only shipowners can create ships' 
      });
    }

    const shipData = {
      ...req.body,
      ownerId: req.user.id,
      owner: req.user.company || req.user.name
    };

    const ship = await Ship.create(shipData);
    res.status(201).json({ 
      message: 'Ship created successfully',
      ship 
    });
  } catch (error) {
    console.error('Create ship error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's ships
router.get('/my/ships', authenticateToken, async (req, res) => {
  try {
    if (req.user.type !== 'shipowner') {
      return res.status(403).json({ 
        error: 'Only shipowners can view their ships' 
      });
    }

    const ships = await Ship.findByOwnerId(req.user.id);
    res.json({ ships });
  } catch (error) {
    console.error('Get user ships error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;