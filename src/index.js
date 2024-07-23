const fastify = require('fastify')({ logger: true });
const app = require('./app');
const serverConfig = require('./config/serverConfig');
const connectToDB = require('../src/config/db.config');
const errorHandler = require('./utils/errorHandler');
const evaluationWorker = require('./workers/evaluationWorker');

// Register the app plugin
fastify.register(app);
fastify.setErrorHandler(errorHandler);

// Run the server
fastify.listen({ port:serverConfig.PORT }, async (err) => {
    
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    
    await connectToDB();
    evaluationWorker("EvaluationQueue");
    console.log(`Server is up at port ${serverConfig.PORT }` );
});
