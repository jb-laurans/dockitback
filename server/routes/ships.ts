import express, { Request, Response } from 'express';
import { Ship } from '../models/Ship';
import { authenticateToken } from '../middleware/auth';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    type: string;
    company?: string;
    name: string;
  };
}

const router = express.Router();

// Get all ships with optional filters
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const filters = {
      type: req.query.type as string,
      minDwt: req.query.minDwt ? parseInt(req.query.minDwt as string) : undefined,
      maxDwt: req.query.maxDwt ? parseInt(req.query.maxDwt as string) : undefined,
      port: req.query.port as string
    };

    const ships = await Ship.findAll(filters);
    res.json({ ships });
  } catch (error) {
    console.error('Get ships error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get ship by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const ship = await Ship.findById(Number(req.params.id));
    
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
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest;
  try {
    if (authenticatedReq.user.type !== 'shipowner') {
      return res.status(403).json({ 
        error: 'Only shipowners can create ships' 
      });
    }

    const shipData = {
      ...req.body,
      ownerId: authenticatedReq.user.id,
      owner: authenticatedReq.user.company || authenticatedReq.user.name
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
router.get('/my/ships', authenticateToken, async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest;
  try {
    if (authenticatedReq.user.type !== 'shipowner') {
      return res.status(403).json({ 
        error: 'Only shipowners can view their ships' 
      });
    }

    const ships = await Ship.findByOwnerId(authenticatedReq.user.id);
    res.json({ ships });
  } catch (error) {
    console.error('Get user ships error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 