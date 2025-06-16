import pool from '../config/database';
import bcrypt from 'bcryptjs';

const seedData = async () => {
  try {
    console.log('🌱 Seeding database with sample data...');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const users = await pool.query(`
      INSERT INTO users (name, email, password, type, company, verified)
      VALUES 
        ('Sarah Nielsen', 'sarah@balticshipping.com', $1, 'shipowner', 'Baltic Shipping Co.', true),
        ('Marcus Chen', 'marcus@globaltrade.com', $1, 'charterer', 'Global Trade Solutions', true),
        ('Elena Rodriguez', 'elena@europemaritime.com', $1, 'shipowner', 'European Maritime Ltd.', true),
        ('James Wilson', 'james@steelcorp.com', $1, 'charterer', 'Steel Corp International', true)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, name, type
    `, [hashedPassword]);

    console.log(`✅ Created ${users.rows.length} users`);

    // Create sample ships
    const ships = await pool.query(`
      INSERT INTO ships (
        name, type, dwt, current_port, next_available_date,
        lat, lng, owner, images, specifications, rate_per_day, owner_id
      )
      VALUES 
        (
          'Ocean Pioneer', 'bulk_carrier', 75000, 'Hamburg', '2024-02-15',
          53.5511, 9.9937, 'Baltic Shipping Co.',
          '["https://images.pexels.com/photos/163726/belgium-antwerp-shipping-163726.jpeg"]',
          '{"length": 225, "beam": 32, "draft": 14.5, "builtYear": 2018, "flag": "Marshall Islands"}',
          12000, 1
        ),
        (
          'Atlantic Star', 'container', 95000, 'Rotterdam', '2024-02-20',
          51.9244, 4.4777, 'European Maritime Ltd.',
          '["https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg"]',
          '{"length": 280, "beam": 40, "draft": 16, "builtYear": 2020, "flag": "Cyprus"}',
          18000, 3
        ),
        (
          'Nordic Wave', 'tanker', 115000, 'Oslo', '2024-02-10',
          59.9139, 10.7522, 'Scandinavian Fleet',
          '["https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg"]',
          '{"length": 240, "beam": 42, "draft": 15.8, "builtYear": 2019, "flag": "Norway"}',
          22000, 1
        ),
        (
          'Mediterranean Express', 'container', 85000, 'Barcelona', '2024-02-25',
          41.3851, 2.1734, 'European Maritime Ltd.',
          '["https://images.pexels.com/photos/163726/belgium-antwerp-shipping-163726.jpeg"]',
          '{"length": 260, "beam": 38, "draft": 15, "builtYear": 2021, "flag": "Malta"}',
          16000, 3
        ),
        (
          'Baltic Trader', 'bulk_carrier', 65000, 'Stockholm', '2024-03-01',
          59.3293, 18.0686, 'Baltic Shipping Co.',
          '["https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg"]',
          '{"length": 210, "beam": 30, "draft": 13.5, "builtYear": 2017, "flag": "Sweden"}',
          11000, 1
        )
      ON CONFLICT DO NOTHING
      RETURNING id, name
    `);

    console.log(`✅ Created ${ships.rows.length} ships`);

    // Create sample cargos
    const cargos = await pool.query(`
      INSERT INTO cargos (
        commodity, quantity, loading_port, discharge_port,
        laycan_start, laycan_end, charterer, description, charterer_id
      )
      VALUES 
        (
          'Iron Ore', 70000, 'Narvik', 'Hamburg',
          '2024-02-15', '2024-02-20', 'Steel Corp International',
          'High-grade iron ore pellets for steel production', 4
        ),
        (
          'Containers', 2500, 'Rotterdam', 'Singapore',
          '2024-02-25', '2024-03-05', 'Global Trade Solutions',
          'Mixed containerized cargo - electronics and machinery', 2
        ),
        (
          'Wheat', 45000, 'Gdansk', 'Alexandria',
          '2024-03-01', '2024-03-10', 'Global Trade Solutions',
          'Premium wheat for export to Middle East', 2
        )
      ON CONFLICT DO NOTHING
      RETURNING id, commodity
    `);

    console.log(`✅ Created ${cargos.rows.length} cargos`);

    // Create sample matches
    const matches = await pool.query(`
      INSERT INTO matches (ship_id, user_id, status, matched_at)
      VALUES 
        (1, 2, 'negotiating', NOW() - INTERVAL '2 days'),
        (2, 4, 'pending', NOW() - INTERVAL '1 day'),
        (3, 2, 'accepted', NOW() - INTERVAL '3 days')
      ON CONFLICT (ship_id, user_id) DO NOTHING
      RETURNING id
    `);

    console.log(`✅ Created ${matches.rows.length} matches`);

    console.log('🎉 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Run seeding
seedData()
  .then(() => {
    console.log('✨ Seeding completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  }); 