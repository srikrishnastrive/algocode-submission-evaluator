// async function pingCheck() {
//     return "pong";
// }

const submissionQueueProducer = require("../producers/submissionQueueProducer");

// module.exports = { pingCheck };


class SubmissionService{
    constructor(){
        //inject here
    }
    async pingCheck(){
        return 'pong';
    }
    async addSubmission(submission){
        const submission = this.submissionRepository.createSubmission(submission);
        if(!submission){
            throw {message:"Not able to crate submission"}
        }
        console.log(submission);
        const response = await submissionQueueProducer(submission);
        return {queueResponse: response, submission};
        
    }
}

module.exports = SubmissionService;