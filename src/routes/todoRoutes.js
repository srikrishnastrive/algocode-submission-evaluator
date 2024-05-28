const fastifyPlugin = require('fastify-plugin');


async function todoRoutes(fastify,options){
    fastify.get('/todo', async (req, res)=>{
        return {data:["todo"]};
    })
}

module.exports = fastifyPlugin(todoRoutes);