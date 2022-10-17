const express = require('express')
const { getAllJobsHM, getAJobHM } = require('../Controller/Manager.controller')
const Authentication = require('../Utils/Authentication')
const TokenVerify = require('../Utils/TokenVerify')
const managerRoute = express.Router()


managerRoute.get('/jobs', TokenVerify, Authentication('Hiring Manager'), getAllJobsHM)
managerRoute.get('/jobs/:id', TokenVerify, Authentication('Hiring Manager'), getAJobHM)

module.exports = managerRoute