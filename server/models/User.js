import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export class User {
  static async create({ name, email, password, type, company }) {
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const query = `
      INSERT INTO users (name, email, password, type, company, verified, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      RETURNING id, name, email, type, company, verified, created_at
    `;
    
    const values = [name, email, hashedPassword, type, company, false];
    
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT id, name, email, type, company, verified, created_at
      FROM users WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateProfile(id, { name, company }) {
    const query = `
      UPDATE users 
      SET name = $1, company = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING id, name, email, type, company, verified, created_at
    `;
    
    const result = await pool.query(query, [name, company, id]);
    return result.rows[0];
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}