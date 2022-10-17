const express = require('express')
const { getAUser, getAllUsers, createAUser, loginUser, getAllCandidates, userGetInfo, updateUserRole, getAllCandidate, getACandidate, getAllHiringManagers } = require('../Controller/User.controller')
const Authentication = require('../Utils/Authentication')
const TokenVerify = require('../Utils/TokenVerify')
const userRoute = express.Router()

// admin routes
userRoute.get('/', TokenVerify, Authentication('Admin'), getAllUsers)
userRoute.get('/candidate', TokenVerify, Authentication('Admin'), getAllCandidate)
userRoute.get('/candidate/:id', TokenVerify, Authentication('Admin'), getACandidate)
userRoute.get('/hiring_managers', TokenVerify, Authentication('Admin'), getAllHiringManagers)
userRoute.patch('/userauth', TokenVerify, Authentication('Admin'), updateUserRole)

// userRoute.get('/:id', getAUser)
userRoute.get('/me', TokenVerify, userGetInfo)
userRoute.post('/signup', createAUser)
userRoute.post('/login', loginUser)


module.exports = userRoute