
export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Node TS',
      version: '1.0.0',
      description: 'CRUD de Users + Auth JWT',
    },
    servers: [{ url: 'http://localhost:3333' }],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },

      schemas: {
        LoginBody: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'lucas@mail.com' },
            password: { type: 'string', example: '123456' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
              },
            },
          },
        },
        UserCreateBody: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Lucas' },
            email: { type: 'string', example: 'lucas@mail.com' },
            password: { type: 'string', example: '123456' },
          },
        },
        UserUpdateBody: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Lucas Lima' },
            email: { type: 'string', example: 'lucas.lima@mail.com' },
            password: { type: 'string', example: '123456' },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Invalid token' },
          },
        },
      },
    },
  },

  apis: ['src/api/routes/*.ts'],
};
