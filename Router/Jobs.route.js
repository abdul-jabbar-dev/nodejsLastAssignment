const express = require('express')
const upload = require('../Config/multer')
const { getAllJobs, getAJob, applyAJob, createAJob, updateAJob } = require('../Controller/Jobs.controller')
const Authentication = require('../Utils/Authentication')
const TokenVerify = require('../Utils/TokenVerify')
const jobsRoute = express.Router()

// Hiring Manager Routers
jobsRoute.patch('/:id', TokenVerify, Authentication('Hiring Manager'), updateAJob)
jobsRoute.post('/', TokenVerify, Authentication('Hiring Manager'), createAJob)

// candidate Routers
jobsRoute.get('/', TokenVerify, Authentication('Candidate'), getAllJobs)
jobsRoute.get('/:id', TokenVerify, Authentication('Candidate'), getAJob)
jobsRoute.post('/:id/apply', TokenVerify, Authentication('Candidate'), upload.single('resume'), applyAJob)


module.exports = jobsRoute