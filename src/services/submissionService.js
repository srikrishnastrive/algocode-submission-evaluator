const { fetchProblemDetails } = require("../apis/problemAdminApi");
const SubmissionCreationError = require("../errors/submissionCreationError");
const submissionQueueProducer = require("../producers/submissionQueueProducer");



class SubmissionService{
    constructor(submissionRepository){
        this.submissionRepository = submissionRepository;
    }
    // async addSubmission(submissionPayload){
    //     //Hit the problem admin service and fetch the problem details
    //     //we are getting the problem Id from the front end
    //     const problemId = submissionPayload.problemId;

    //     const problemAdminResponse = await fetchProblemDetails(problemId);
    //     console.log(problemAdminResponse);
    //     return true;

    //     //we are going to create entry in db.
    //     // const submission = await this.submissionRepository.createSubmission(submissionPayload);
    //     // if(!submission){
    //     //     throw {message:"Not able to crate submission"}
    //     // }
    //     // console.log(submission);
    //     // const response = await submissionQueueProducer(submission);
    //     // return {queueResponse: response, submission};
        
    // }
    async addSubmission(submissionPayload) {
        // Hit the problem admin service and fetch the problem details
        const problemId = submissionPayload.problemId;
        const userId = submissionPayload.userId;

        const problemAdminApiResponse = await fetchProblemDetails(problemId);

        if(!problemAdminApiResponse) {
            throw new SubmissionCreationError('Failed to create a submission in the repository');
        }

        const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(codeStub => codeStub.language.toLowerCase() === submissionPayload.language.toLowerCase());

        console.log(languageCodeStub) 

        submissionPayload.code = languageCodeStub.startSnippet + "\n\n" + submissionPayload.code + "\n\n" + languageCodeStub.endSnippet;


        const submission = await this.submissionRepository.createSubmission(submissionPayload);
        if(!submission) {
            // TODO: Add error handling here
            throw new SubmissionCreationError('Failed to create a submission in the repository');
        }
        console.log(submission);
        const response = await submissionQueueProducer({
            [submission._id]: {
                code: submission.code,
                language: submission.language,
                inputCase: problemAdminApiResponse.data.testCases[0].input,
                outputCase: problemAdminApiResponse.data.testCases[0].output,
                userId: userId,
                submissionId : submission._id
            }
        });
        return {queueResponse: response, submission};
    }
}

module.exports = SubmissionService;