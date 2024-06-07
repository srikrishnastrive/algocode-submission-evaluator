const fastify = require('fastify')({ logger: true });
const app = require('./app');
const serverConfig = require('./config/serverConfig');

// Register the app plugin
fastify.register(app);

// Run the server
fastify.listen({ port:serverConfig.PORT }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server is up at port ${serverConfig.PORT }` );
});
