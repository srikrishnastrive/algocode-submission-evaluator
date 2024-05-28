const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');
const todoRoutes = require('./routes/todoRoutes');

async function app(fastify, options) {
    // Register CORS plugin
    fastify.register(require('@fastify/cors'));

    //registering a service plugin
    fastify.register(servicePlugin);

    fastify.register(todoRoutes, {prefix:'/todo'});

    // Register the test routes with a prefix
    fastify.register(require('./routes/api/apiRoutes'), { prefix: '/api' });

    
}

module.exports = fastifyPlugin(app);
