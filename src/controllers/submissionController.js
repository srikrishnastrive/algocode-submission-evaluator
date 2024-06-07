async function createSubmission(req, res) {
    console.log(req.body);
    const response = await this.submissionService.addSubmission(req.body);
    console.log(response);
    return res.status(201).send({
        error: {},
        data: response,
        success: true,
        message: 'Created submission successfully'
    })

}

module.exports = { createSubmission };
