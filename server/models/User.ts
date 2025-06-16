import pool from '../config/database';

export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  type: 'charterer' | 'shipowner';
  company?: string;
  verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export class User {
  static async create({ name, email, password, type, company }: Partial<UserType>): Promise<UserType> {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, type, company, verified)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, email, password, type, company, true]
    );
    return result.rows[0];
  }

  static async findById(id: number): Promise<UserType | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async findByEmail(email: string): Promise<UserType | null> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const bcrypt = await import('bcryptjs');
    return bcrypt.compare(password, hashedPassword);
  }

  static async getDashboard(userId: number): Promise<{ ships: number; matches: number }> {
    try {
      const [shipsRes, matchesRes] = await Promise.all([
        pool.query('SELECT COUNT(*) FROM ships WHERE owner_id = $1', [userId]),
        pool.query('SELECT COUNT(*) FROM matches WHERE user_id = $1', [userId])
      ]);

      return {
        ships: parseInt(shipsRes.rows[0].count, 10),
        matches: parseInt(matchesRes.rows[0].count, 10)
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  }
} 