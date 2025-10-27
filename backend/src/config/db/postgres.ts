import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// Check if all required environment variables are present
const requiredEnvVars = [
  'POSTGRES_HOST',
  'POSTGRES_PORT', 
  'POSTGRES_DB',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing PostgreSQL environment variables:', missingVars);
  console.error('Please check your .env file and ensure all variables are set');
}

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 15000,
  idleTimeoutMillis: 60000,
  max: 10,
  min: 2,
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
});

// Test connection on startup
pool.on('connect', (client) => {
  console.log('✅ PostgreSQL client connected successfully');
  // Set a longer statement timeout for each connection
  client.query('SET statement_timeout = 30000');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err.message);
  console.error('Check your database credentials and network connection');
  // Don't exit the process, let the pool handle reconnection
});

pool.on('remove', () => {
  console.log('🔄 PostgreSQL client removed from pool');
});

// Test initial connection with retry logic
const testConnection = async (retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const client = await pool.connect();
      console.log('🔗 PostgreSQL database connection established');
      
      // Test the connection with a simple query
      await client.query('SELECT NOW()');
      console.log('✅ Database query test successful');
      
      client.release();
      return true;
    } catch (err: any) {
      console.error(`❌ Connection attempt ${attempt}/${retries} failed:`, err.message);
      
      if (attempt === retries) {
        console.error('❌ All connection attempts failed. Please check your database configuration.');
        return false;
      } else {
        console.log(`⏳ Retrying in 2 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  return false;
};

// Helper function to execute queries with error handling
export const executeQuery = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Test connection when module loads
testConnection();

export default pool;
