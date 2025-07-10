import dotenv from 'dotenv';
dotenv.config();

export default {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1124',
    database: process.env.DB_DATABASE || 'postgres_mern',
    port: process.env.DB_PORT || 5432,
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};
