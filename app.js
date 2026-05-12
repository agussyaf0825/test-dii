if (process.env.ENV_FILE) require('dotenv').config({ path: `.env.${process.env.ENV_FILE}` });
else require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const menuRouter = require('./routes/menu');
const app = express();
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./config/swagger');
const { authorization } = require('./middleware/authorization');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/menu', authorization, menuRouter);

// Swagger UI documentation
app.use(
  '/api/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Test DII Management API Documentation',
  })
);

app.use((req, res) => {
  // Use standardized error response format
  res.status(405).json({
    success: false,
    message: `Method ${req.method}, Route ${req.originalUrl} not found`,
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(
    'Server Started Successfully',
    {
      port: process.env.PORT || 9090,
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
    },
    {
      type: 'server_startup',
    }
  );
});
module.exports = app;
