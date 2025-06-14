import pool from '../config/database.js';

export class Ship {
  static async create(shipData) {
    const {
      name, type, dwt, currentPort, nextAvailableDate,
      lat, lng, owner, images, specifications, ratePerDay, ownerId
    } = shipData;

    const query = `
      INSERT INTO ships (
        name, type, dwt, current_port, next_available_date,
        lat, lng, owner, images, specifications, rate_per_day, owner_id,
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
      RETURNING *
    `;

    const values = [
      name, type, dwt, currentPort, nextAvailableDate,
      lat, lng, owner, JSON.stringify(images), JSON.stringify(specifications),
      ratePerDay, ownerId
    ];

    const result = await pool.query(query, values);
    return this.formatShip(result.rows[0]);
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM ships WHERE 1=1';
    const values = [];
    let paramCount = 0;

    if (filters.type) {
      paramCount++;
      query += ` AND type = $${paramCount}`;
      values.push(filters.type);
    }

    if (filters.minDwt) {
      paramCount++;
      query += ` AND dwt >= $${paramCount}`;
      values.push(filters.minDwt);
    }

    if (filters.maxDwt) {
      paramCount++;
      query += ` AND dwt <= $${paramCount}`;
      values.push(filters.maxDwt);
    }

    if (filters.port) {
      paramCount++;
      query += ` AND current_port ILIKE $${paramCount}`;
      values.push(`%${filters.port}%`);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, values);
    return result.rows.map(this.formatShip);
  }

  static async findById(id) {
    const query = 'SELECT * FROM ships WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.formatShip(result.rows[0]);
  }

  static async findByOwnerId(ownerId) {
    const query = 'SELECT * FROM ships WHERE owner_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [ownerId]);
    return result.rows.map(this.formatShip);
  }

  static formatShip(row) {
  let images = [];

  if (row.images) {
    try {
      images = typeof row.images === 'string' ? JSON.parse(row.images) : row.images;
      if (!Array.isArray(images)) {
        images = [images];
      }
    } catch (e) {
      if (typeof row.images === 'string') {
        images = [row.images];
      }
    }
  }

  let specs = row.specifications || '{}';

  if (typeof specs === 'string') {
    try {
      specs = JSON.parse(specs);
    } catch {
      specs = {};
    }
  }

  return {
    id: row.id,
    name: row.name,
    type: row.type,
    dwt: row.dwt,
    currentPort: row.current_port,
    nextAvailableDate: row.next_available_date,
    position: {
      lat: parseFloat(row.lat),
      lng: parseFloat(row.lng)
    },
    owner: row.owner,
    images: images,
    specifications: specs,
    ratePerDay: row.rate_per_day,
    ownerId: row.owner_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}


}