const fastify = require('fastify')({ logger: true });
const app = require('./app');

// Register the app plugin
fastify.register(app);

// Run the server
fastify.listen({ port: 3000 }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log('Server is up at port 3000');
});
