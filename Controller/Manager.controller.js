const JOBS = require("../Schema/Job.schema");
const USERS = require("../Schema/User.schema");

module.exports.getAllJobsHM = async (req, res) => {
    try {
        const result = await JOBS.find({ 'postedBy._id': req.user._id })
        res.send(result)
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error.massage
        })
    }
}
module.exports.getAJobHM = async (req, res) => {
    try {
        const result = await JOBS.findOne({ _id: req.params.id }).populate('appliedCandidate._id')
        res.send(result)
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error.massage
        })
    }
}