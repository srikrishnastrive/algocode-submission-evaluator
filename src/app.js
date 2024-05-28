const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');

async function app(fastify, options) {
    // Register CORS plugin
    fastify.register(require('@fastify/cors'));

    //registering a service plugin
    fastify.register(servicePlugin);

    // Register the test routes with a prefix
    fastify.register(require('./routes/api/apiRoutes'), { prefix: '/api' });

    
}

module.exports = fastifyPlugin(app);
