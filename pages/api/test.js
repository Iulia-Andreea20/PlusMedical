// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'plusmedical',
//   host: 'db',
//   database: 'plusmedical',
//   password: 'plusmedical',
//   port: 5432,
// });

// export default async function handler(req, res) {
//   try {
//     const client = await pool.connect();
//     const result = await client.query('SELECT * FROM test');
//     client.release();
//     res.status(200).json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }
//-----------------------------------------------------
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// export default async function handler(req, res) {
//     try {
//       // Assuming 'test' is a model name in your Prisma schema
//       const result = await prisma.test.findMany();
//       res.status(200).json(result);
//     } catch (err) {
//       console.error('Request error', err);
//       res.status(500).json({ error: err.message });
//     }
//   }
import prisma from '@components/prisma'; // Ensure this path and import are correct
// console.log('A',prisma); // Should output the PrismaClient object


export default async function handler(req, res) {
    try {
        const data = await prisma.test.findMany(); // Replace 'model' with your actual model name
        res.status(200).json(data);
    } catch (error) {
    //   console.log('B', prisma); 
        console.error('Error accessing the database:', error);
        res.status(500).json({ error: "Internal server error" });
    }
}