const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        trim: true,
        lowercase: true,
        uniq: true,
        required: [true, 'Job Title require']
    },
    postedBy: {
        name: {
            type: String,
            trim: true
        },
        _id: {
            type: mongoose.Types.ObjectId,
            ref: 'users'
        },
        email: String,
        phoneNumber: Number
    },
    appliedCandidate: [{
        candidateName: String,
        resume: String,
        _id: {
            type: mongoose.Types.ObjectId,
            ref: 'users'
        },
    }],
    vacancy: {
        type: Number,
        required: [true, 'Vacancy require']
    },
    jobType: {
        type: String,
        enum: ['Part-time', 'Full-time', 'Remote', 'Permanent', 'Freelance'],
        required: [true, 'Job Type must be Part-time, Full-Time, Remote, Permanent, Freelance']
    },
    salary: {
        type: Number,
        required: [true, 'Salary require']
    },
    location: {
        type: String,
        required: [true, 'Location require']
    }, company: {
        type: String,
        required: [true, 'company name require']
    },
    experienceRequirements: {
        type: String,
        default: "No requirements"
    },
    additionalRequirements: {
        type: String,
        default: "No requirements"
    },
    deadline: {
        type: String,
        required: [true, 'Application deadline require']
    },
    createAt: Date,
    updateAt: Date
}, {
    timestamps: true
})


const JOBS = mongoose.model('jobs', jobSchema)
module.exports = JOBS