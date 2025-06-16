import express, { Request, Response } from 'express';
import { Match } from '../models/Match';
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

// Create a match (swipe right)
router.post('/', authenticateToken, async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest;
  try {
    const { shipId, cargoId } = req.body;

    if (!shipId) {
      return res.status(400).json({ error: 'Ship ID is required' });
    }

    const match = await Match.create({
      shipId,
      userId: authenticatedReq.user.id,
      cargoId
    });

    res.status(201).json({
      message: 'Match created successfully',
      match
    });
  } catch (error: any) {
    console.error('Create match error:', error);
    
    if (error.message === 'Match already exists') {
      return res.status(409).json({ error: error.message });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's matches
router.get('/my', authenticateToken, async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest;
  try {
    const matches = await Match.findByUserId(authenticatedReq.user.id);
    res.json({ matches });
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update match status
router.put('/:id/status', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'accepted', 'negotiating', 'confirmed'].includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status' 
      });
    }

    const match = await Match.updateStatus(Number(req.params.id), status);
    
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    res.json({
      message: 'Match status updated successfully',
      match
    });
  } catch (error) {
    console.error('Update match status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 