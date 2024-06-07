const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');
const repositoryPlugin = require('./repositories/repositoryPlugin');
const todoRoutes = require('./routes/api/v1/submissionRoutes');

async function app(fastify, options) {
    // Register CORS plugin
    fastify.register(require('@fastify/cors'));

    //registering repository plugin
    fastify.register(repositoryPlugin);

    //registering a service plugin
    fastify.register(servicePlugin);

    fastify.register(todoRoutes, {prefix:'/todo'});

    // Register the test routes with a prefix
    fastify.register(require('./routes/api/apiRoutes'), { prefix: '/api' });

    
}

module.exports = fastifyPlugin(app);
