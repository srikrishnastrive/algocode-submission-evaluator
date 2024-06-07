const fastify = require('fastify')({ logger: true });
const app = require('./app');
const serverConfig = require('./config/serverConfig');
const connectToDB = require('../src/config/db.config');

// Register the app plugin
fastify.register(app);

// Run the server
fastify.listen({ port:serverConfig.PORT }, async (err) => {
    
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    await connectToDB();
    console.log(`Server is up at port ${serverConfig.PORT }` );
});
