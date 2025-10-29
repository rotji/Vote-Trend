const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Database connection
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'votetrend',
  password: process.env.POSTGRES_PASSWORD || 'your_password',
  port: process.env.POSTGRES_PORT || 5432,
  ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function runMigration() {
  try {
    console.log('🔄 Running migration: add_multiple_images_support.sql');
    
    // Read the migration file
    const migrationPath = path.join(__dirname, 'migrations', 'add_multiple_images_support.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Split by semicolon and filter out empty statements and comments
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt && !stmt.startsWith('--') && !stmt.startsWith('\\d'));
    
    const client = await pool.connect();
    
    for (const statement of statements) {
      if (statement) {
        console.log(`📝 Executing: ${statement.substring(0, 100)}...`);
        await client.query(statement);
      }
    }
    
    client.release();
    console.log('✅ Migration completed successfully!');
    
    // Verify the table was created
    const verifyClient = await pool.connect();
    const result = await verifyClient.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'poll_images'
    `);
    
    console.log('📋 poll_images table structure:');
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });
    
    verifyClient.release();
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await pool.end();
  }
}

runMigration();