import pool from '../config/database.js';

const createTables = async () => {
  try {
    console.log('🚀 Setting up database tables...');

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL CHECK (type IN ('charterer', 'shipowner')),
        company VARCHAR(255),
        verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ships table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ships (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL CHECK (type IN ('bulk_carrier', 'container', 'tanker', 'general_cargo')),
        dwt INTEGER NOT NULL,
        current_port VARCHAR(255) NOT NULL,
        next_available_date DATE NOT NULL,
        lat DECIMAL(10, 8) NOT NULL,
        lng DECIMAL(11, 8) NOT NULL,
        owner VARCHAR(255) NOT NULL,
        images JSONB DEFAULT '[]',
        specifications JSONB DEFAULT '{}',
        rate_per_day INTEGER,
        owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Cargos table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cargos (
        id SERIAL PRIMARY KEY,
        commodity VARCHAR(255) NOT NULL,
        quantity INTEGER NOT NULL,
        loading_port VARCHAR(255) NOT NULL,
        discharge_port VARCHAR(255) NOT NULL,
        laycan_start DATE NOT NULL,
        laycan_end DATE NOT NULL,
        charterer VARCHAR(255) NOT NULL,
        description TEXT,
        charterer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Matches table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS matches (
        id SERIAL PRIMARY KEY,
        ship_id INTEGER REFERENCES ships(id) ON DELETE CASCADE,
        cargo_id INTEGER REFERENCES cargos(id) ON DELETE SET NULL,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'negotiating', 'confirmed')),
        matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(ship_id, user_id)
      )
    `);

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_ships_type ON ships(type);
      CREATE INDEX IF NOT EXISTS idx_ships_dwt ON ships(dwt);
      CREATE INDEX IF NOT EXISTS idx_ships_port ON ships(current_port);
      CREATE INDEX IF NOT EXISTS idx_ships_owner ON ships(owner_id);
      CREATE INDEX IF NOT EXISTS idx_matches_user ON matches(user_id);
      CREATE INDEX IF NOT EXISTS idx_matches_ship ON matches(ship_id);
    `);

    console.log('✅ Database tables created successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
};

// Run setup
createTables()
  .then(() => {
    console.log('🎉 Database setup completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Database setup failed:', error);
    process.exit(1);
  });