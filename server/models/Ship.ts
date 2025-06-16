import pool from '../config/database';

export interface ShipType {
  id: number;
  name: string;
  type: string;
  dwt: number;
  current_port: string;
  next_available_date: Date;
  lat: number;
  lng: number;
  owner: string;
  images?: string[];
  specifications?: Record<string, unknown>;
  rate_per_day?: number;
  owner_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ShipFilters {
  type?: string;
  minDwt?: number;
  maxDwt?: number;
  port?: string;
}

export class Ship {
  static async findAll(filters?: ShipFilters): Promise<ShipType[]> {
    let query = 'SELECT * FROM ships';
    const values: (string | number)[] = [];
    const conditions: string[] = [];

    if (filters) {
      if (filters.type) {
        conditions.push('type = $' + (values.length + 1));
        values.push(filters.type);
      }
      if (filters.minDwt) {
        conditions.push('dwt >= $' + (values.length + 1));
        values.push(filters.minDwt);
      }
      if (filters.maxDwt) {
        conditions.push('dwt <= $' + (values.length + 1));
        values.push(filters.maxDwt);
      }
      if (filters.port) {
        conditions.push('current_port = $' + (values.length + 1));
        values.push(filters.port);
      }
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const result = await pool.query(query, values);
    return result.rows;
  }

  static async findById(id: number): Promise<ShipType | null> {
    const result = await pool.query('SELECT * FROM ships WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(shipData: Omit<ShipType, 'id'>): Promise<ShipType> {
    const result = await pool.query(
      'INSERT INTO ships (name, type, dwt, current_port, next_available_date, lat, lng, owner, owner_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [shipData.name, shipData.type, shipData.dwt, shipData.current_port, shipData.next_available_date, shipData.lat, shipData.lng, shipData.owner, shipData.owner_id]
    );
    return result.rows[0];
  }

  static async findByOwnerId(ownerId: number): Promise<ShipType[]> {
    const result = await pool.query('SELECT * FROM ships WHERE owner_id = $1', [ownerId]);
    return result.rows;
  }
} 