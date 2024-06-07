const testController = require('../../../../controllers/submissionController');

async function testRoutes(fastify, options) {
    fastify.get('/ping', testController.pingRequest);
}

module.exports = testRoutes;
