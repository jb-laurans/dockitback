import pool from '../config/database.js';

export class Match {
  static async create({ shipId, userId, cargoId = null }) {
    // Check if match already exists
    const existingQuery = `
      SELECT id FROM matches 
      WHERE ship_id = $1 AND user_id = $2
    `;
    const existing = await pool.query(existingQuery, [shipId, userId]);
    
    if (existing.rows.length > 0) {
      throw new Error('Match already exists');
    }

    const query = `
      INSERT INTO matches (ship_id, user_id, cargo_id, status, matched_at)
      VALUES ($1, $2, $3, 'pending', NOW())
      RETURNING *
    `;

    const result = await pool.query(query, [shipId, userId, cargoId]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT m.*, s.name as ship_name, s.owner as ship_owner, s.type as ship_type,
             s.dwt, s.current_port, s.images
      FROM matches m
      JOIN ships s ON m.ship_id = s.id
      WHERE m.user_id = $1
      ORDER BY m.matched_at DESC
    `;

    const result = await pool.query(query, [userId]);
    return result.rows.map(row => ({
      id: row.id,
      shipId: row.ship_id,
      cargoId: row.cargo_id,
      userId: row.user_id,
      status: row.status,
      matchedAt: row.matched_at,
      ship: {
        name: row.ship_name,
        owner: row.ship_owner,
        type: row.ship_type,
        dwt: row.dwt,
        currentPort: row.current_port,
        images: JSON.parse(row.images || '[]')
      }
    }));
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE matches 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }
}