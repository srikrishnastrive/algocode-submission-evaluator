const { Worker } = require('bullmq');
const redisConnection = require('../config/redisConfig');
const axios = require('axios');

function evaluationWorker(queue) {
    new Worker('EvaluationQueue', async job => {
        if (job.name === 'EvaluatorJob') {
            try {
                const response = await axios.post('http://localhost:3002/sendPayload', {
                    userId: job.data.userId,
                    payload: job.data
                })
                console.log(response);
              console.log(job.data);
            } catch(error) {
                console.log(error)
            }
        }
    }, {
        connection: redisConnection
    });
}

module.exports = evaluationWorker;