// const { Pool } = require('pg');

// console.log('Connecting to the database:', process.env.DATABASE_URL);

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// pool.on('connect', () => {
//   console.log('Connected to the database');
// });

// module.exports = pool;
//-----------------------------------------------------------
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // turn off SQL logging
});

module.exports = sequelize;