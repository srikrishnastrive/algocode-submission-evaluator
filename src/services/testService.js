// async function pingCheck() {
//     return "pong";
// }

// module.exports = { pingCheck };


class TestService{
    constructor(){
        //inject here
    }
    async pingCheck(){
        return 'pong';
    }
}

module.exports = TestService;