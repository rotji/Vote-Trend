// Script to run database migration for multiple images
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const runMigration = async () => {
  let client;
  try {
    client = await pool.connect();
    console.log('🔗 Connected to database');

    // Create poll_images table
    await client.query(`
      CREATE TABLE IF NOT EXISTS poll_images (
        id SERIAL PRIMARY KEY,
        poll_id INTEGER NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
        image_url VARCHAR(500) NOT NULL,
        image_description VARCHAR(200),
        display_order INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created poll_images table');

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_poll_images_poll_id ON poll_images(poll_id);
    `);
    console.log('✅ Created indexes');

    // Add main_image_url column to polls table for backward compatibility
    await client.query(`
      ALTER TABLE polls ADD COLUMN IF NOT EXISTS main_image_url VARCHAR(500);
    `);
    console.log('✅ Added main_image_url column to polls table');

    console.log('🎉 Migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    if (client) {
      client.release();
    }
    process.exit(0);
  }
};

runMigration();