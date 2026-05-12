if (process.env.ENV_FILE) {
  require('dotenv').config({ path: `.env.${process.env.ENV_FILE}` });
} else {
  require('dotenv').config();
}

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_POOL_MAX = '10',
  DB_POOL_MIN = '10',
  DB_POOL_ACQUIRE = '30000',
  DB_POOL_IDLE = '60000',
} = process.env;

// Konfigurasi umum untuk database
const baseConfig = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  pool: {
    max: Number(DB_POOL_MAX),
    min: Number(DB_POOL_MIN),
    acquire: Number(DB_POOL_ACQUIRE),
    idle: Number(DB_POOL_IDLE),
  },
};

module.exports = {
  development: { ...baseConfig },
  beta: { ...baseConfig },
  staging: { ...baseConfig },
  production: {
    ...baseConfig,
    logging: false, // Nonaktifkan logging untuk produksi
  },
};
