const JOBS = require("../Schema/Job.schema");
const USERS = require("../Schema/User.schema");

module.exports.getAllJobs = async (req, res) => {
    try {
        let sort;
        if (req?.query?.sort) {
            sort = req?.query?.sort?.split(',')?.join(' ')
            delete req.query.sort
        }
        const result = await JOBS.find(req.query).sort(sort)
        res.status(200).send(result)

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error.massage
        })
    }
}
module.exports.getAJob = async (req, res) => {
    try {
        const result = await JOBS.findOne({ _id: req.params.id }).populate('appliedCandidate._id')
        res.status(200).send(result)
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error.massage
        })
    }
}
module.exports.applyAJob = async (req, res) => {

    try {
        const resume = req?.file
        const candidate = req?.user
        let circular = req?.params
        circular = await JOBS.findOne({ _id: circular.id })

        if (!circular) {
            throw "Invalid circular id"
        }
        let day = circular.deadline.split('/')[0]
        let month = circular.deadline.split('/')[1]
        let year = circular.deadline.split('/')[2]

        if (new Date(year, month, day) < new Date()) {
            throw "Circular expire"
        }
        const UpdateCandidateBefore = await USERS.find({ 'circularApplied._id': circular._id })


        if (UpdateCandidateBefore.find(CanUser => (CanUser._id).toString() === (candidate._id).toString())) {
            throw "Already applied!"
        }
        const UpdateCandidate = await USERS.updateOne({ _id: candidate._id },
            {
                $addToSet: {
                    circularApplied: {
                        jobTitle: circular.jobTitle,
                        _id: circular._id
                    }
                }
            })
        await JOBS.updateOne({ _id: circular._id }, {
            $push: {
                appliedCandidate: {
                    candidateName: candidate.name,
                    resume: resume?.filename,
                    _id: candidate._id
                }
            }
        })
        res.send({
            status: "Success",
            massage: "Congratulation for applied circular"
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error
        })
    }

}
//Hiring Manager
module.exports.createAJob = async (req, res) => {
    try {
        let newCircular = req.body
        newCircular.postedBy = {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phoneNumber: req.user.phoneNumber
        }
        const result = await JOBS.create(newCircular)
        const updateUser = await USERS.updateOne({ _id: req.user._id }, {
            $push: {
                postedCircular: { _id: result._id, }
            }
        })
        res.send(updateUser)

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error.massage
        })
    }
}
module.exports.updateAJob = async (req, res) => {
    try {
        const result = await JOBS.updateOne({ _id: req.params.id }, { $set: req.body }, { upsert: true })
        res.send(result)
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error.massage
        })
    }
}