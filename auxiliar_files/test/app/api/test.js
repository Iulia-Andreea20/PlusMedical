// // In an API route or during server-side data fetching
// import pool from '@models/database.js';

// export async function testDatabaseConnection() {
//   try {
//     const { rows } = await pool.query('SELECT NOW()'); // Simple query to get the current time
//     console.log('Database connection test successful:', rows);
//     return true;
//   } catch (error) {
//     console.error('Database connection test failed:', error);
//     return false;
//   }
// }



import pool from '@models/database.js';

export default async function handler(req, res) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test'); // Replace with your actual table name
    res.status(200).json(result.rows);
    client.release();
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', detail: err.message });
  }
}
