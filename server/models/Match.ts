import db from '../config/database';

export interface MatchType {
  id: number;
  shipId: number;
  userId: number;
  cargoId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Match {
  static async create({ shipId, userId, cargoId }: { shipId: number; userId: number; cargoId?: number }): Promise<MatchType> {
    const client = await db.connect();
    try {
      // Check if match already exists
      const existingMatch = await client.query(
        'SELECT * FROM matches WHERE ship_id = $1 AND user_id = $2',
        [shipId, userId]
      );

      if (existingMatch.rows.length > 0) {
        throw new Error('Match already exists');
      }

      const result = await client.query(
        'INSERT INTO matches (ship_id, user_id, cargo_id) VALUES ($1, $2, $3) RETURNING *',
        [shipId, userId, cargoId]
      );

      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async findByUserId(userId: number): Promise<MatchType[]> {
    const client = await db.connect();
    try {
      const result = await client.query(
        'SELECT * FROM matches WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }

  static async updateStatus(id: number, status: string): Promise<MatchType | null> {
    const client = await db.connect();
    try {
      const result = await client.query(
        'UPDATE matches SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }
} 