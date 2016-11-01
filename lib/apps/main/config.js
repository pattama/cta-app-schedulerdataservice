'use strict';
const config = {
  name: 'scheduler-dataservice',
  /**
   * Tools
   */
  tools: [
    {
      name: 'logger',
      module: 'cta-logger',
      properties: {
        level: 'info',
      },
      scope: 'all',
    },
    {
      name: 'messaging',
      module: 'cta-messaging',
      properties: {
        provider: 'rabbitmq',
        parameters: {
          url: 'amqp://localhost?heartbeat=60',
        },
      },
      singleton: true,
    },
    {
      name: 'my-express',
      module: 'cta-expresswrapper',
      properties: {
        port: 3000,
      },
      singleton: true,
    },
    {
      name: 'healthcheck',
      module: 'cta-healthcheck',
      properties: {
        queue: 'healthcheck',
      },
      dependencies: {
        messaging: 'messaging',
        express: 'my-express',
      },
      scope: 'bricks',
      singleton: true,
    },
  ],
  /**
   * Bricks
   */
  bricks: [
    {
      name: 'sender',
      module: 'cta-io',
      dependencies: {
        messaging: 'messaging',
      },
      properties: {
        output: {
          queue: 'queue',
          topic: 'schedule.synchronize',
        },
      },
      subscribe: [{
        topic: 'schedule.synchronize.sender',
        data: [
          {
            nature: {
              type: 'message',
              quality: 'publish',
            },
          }],
      }],
    },
    {
      name: 'receiver',
      module: 'cta-io',
      dependencies: {
        messaging: 'messaging',
      },
      properties: {
        input: {
          topic: 'schedule.synchronize',
        },
      },
      publish: [{
        topic: 'bl.schedulers',
        data: [
          {
            nature: {
              type: 'schedule',
              quality: 'synchronize',
            },
          }],
      }],
    },
    {
      name: 'restapi',
      module: 'cta-restapi',
      dependencies: {
        express: 'my-express',
      },
      properties: {
        providers: [
          {
            name: 'scheduler',
            module: './utils/restapi/handlers/schedules.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
            routes: [
              {
                method: 'post', // http method get|post|put|delete
                handler: 'create', // name of the method in your provider
                path: '/schedules', // the route path
              },
              {
                method: 'put', // http method get|post|put|delete
                handler: 'create', // name of the method in your provider
                path: '/schedules/:id', // the route path
              },
              {
                method: 'patch', // http method get|post|put|delete
                handler: 'update', // name of the method in your provider
                path: '/schedules/:id', // the route path
              },
              {
                method: 'get', // http method get|post|put|delete
                handler: 'findById', // name of the method in your provider
                path: '/schedules/:id', // the route path
              },
              {
                method: 'delete', // http method get|post|put|delete
                handler: 'delete', // name of the method in your provider
                path: '/schedules/:id', // the route path
              },
              {
                method: 'get', // http method get|post|put|delete
                handler: 'find', // name of the method in your provider
                path: '/schedules', // the route path
              },
            ],
          },
        ],
      },
      publish: [
        {
          topic: 'bl.schedulers',
          data: [
            {
              nature: {
                type: 'schedule',
              },
            },
          ],
        },
      ], // don't forget to define this property so that you are able to send jobs to the next bricks
    },
    {
      name: 'mongodblayer',
      module: 'cta-dblayer',
      properties: {
        provider: 'mongodb',
        configuration: {
          databasename: 'oss',
          servers: [
            {
              host: 'localhost',
              port: 27017,
            },
          ],
          options: {},
        },
      },
      publish: [],
      subscribe: [
        {
          topic: 'dblayer',
          data: [
            {
              nature: {
                type: 'database',
                quality: 'query',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'schedulers-businesslogic',
      module: './bricks/businesslogics/schedule/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
      properties: {},
      publish: [
        {
          topic: 'dbinterface',
          data: [
            {
              nature: {
                type: 'dbinterface',
              },
            },
          ],
        },
        {
          topic: 'schedule.synchronize.sender',
          data: [
            {
              nature: {
                type: 'message',
                quality: 'publish',
              },
            },
          ],
        },
      ],
      subscribe: [
        {
          topic: 'bl.schedulers',
          data: [
            {
              nature: {
                type: 'schedule',
                quality: 'create',
              },
            },
            {
              nature: {
                type: 'schedule',
                quality: 'findbyid',
              },
            },
            {
              nature: {
                type: 'schedule',
                quality: 'update',
              },
            },
            {
              nature: {
                type: 'schedule',
                quality: 'delete',
              },
            },
            {
              nature: {
                type: 'schedule',
                quality: 'find',
              },
            },
            {
              nature: {
                type: 'schedule',
                quality: 'synchronize',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'dbinterface-mongodb',
      module: './bricks/dbinterfaces/mongodbinterface/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
      properties: {},
      publish: [
        {
          topic: 'dblayer',
          data: [
            {
              nature: {
                type: 'database',
                quality: 'query',
              },
            },
          ],
        },
      ],
      subscribe: [
        {
          topic: 'dbinterface',
          data: [
            {
              nature: {
                type: 'dbinterface',
              },
            },
          ],
        },
      ],
    },
  ],
};

module.exports = config;
