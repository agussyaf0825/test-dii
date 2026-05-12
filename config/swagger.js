// ============================================================================
// SWAGGER CONFIGURATION
// ============================================================================
// This file contains the Swagger/OpenAPI documentation configuration for the
// Warehouse Management System API
// ============================================================================

const swaggerJSDoc = require('swagger-jsdoc');

// Basic information about the API
const apiInfo = {
  title: 'Test DII Management System API',
  version: '1.0.0',
  description: 'Comprehensive REST API for Test DII',
  contact: {
    name: 'API Support',
    email: 'syafiudinagus@gmail.com',
  },
  license: {
    name: 'MIT',
    url: 'https://opensource.org/licenses/MIT',
  },
};

// Server configuration
const servers = [
  {
    url: process.env.API_URL || 'https://test-dii.gusdev.my.id/api',
    description: 'Development server',
  },
];

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    ...apiInfo,
    termsOfService: 'https://test-dii.gusdev.my.id/terms',
    contact: {
      name: 'API Support',
      url: 'https://test-dii.gusdev.my.id/support',
      email: 'syafiudinagus@gmail.com',
    },
  },
  servers: servers,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
      },
    },
    schemas: {
      // Common Response Schemas
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Indicates if the request was successful',
          },
          data: {
            type: 'object',
            description: 'Response data payload',
          },
        },
        required: ['success'],
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
            description: 'Always false for error responses',
          },
          message: {
            type: 'string',
            description: 'Error message',
          },
        },
        required: ['success', 'message'],
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: 'Authentication',
      description: 'Authentication and authorization endpoints',
    },
  ],
  externalDocs: {
    description: 'Test DII System Documentation',
    url: 'https://test-dii.gusdev.my.id/docs',
  },
};

// API file patterns for JSDoc comments
const options = {
  definition: swaggerDefinition,
  apis: ['./routes/*.js', './controllers/*.js', './middleware/*.js', './db/models/*.js'],
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec,
  swaggerJSDoc,
};
