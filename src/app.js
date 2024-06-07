const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');
const repositoryPlugin = require('./repositories/repositoryPlugin');
const todoRoutes = require('./routes/api/v1/submissionRoutes');

async function app(fastify, options) {
    // Register CORS plugin
    await fastify.register(require('@fastify/cors'));

    //registering repository plugin
    await fastify.register(repositoryPlugin);

    //registering a service plugin
    await fastify.register(servicePlugin);


    // Register the test routes with a prefix
    await fastify.register(require('./routes/api/apiRoutes'), { prefix: '/api' });

    
}

module.exports = fastifyPlugin(app);
