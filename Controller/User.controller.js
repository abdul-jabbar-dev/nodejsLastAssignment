const USERS = require("../Schema/User.schema")
const bcrypt = require('bcrypt')
const generateToken = require('../Utils/Token')
const jwt = require('jsonwebtoken')

module.exports.createAUser = async (req, res) => {
    try {
        const result = await USERS.create(req.body)
        res.status(200).json({
            status: "success",
            insertionId: result._id,
            massage: "Congratulation for create a account"
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error
        })
    }
}
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw "Email and Password required!"
        }
        const existUser = await USERS.findOne({ email })
        if (!existUser) {
            throw "Invalid email!"
        }
        const matchPassword = bcrypt.compareSync(password, existUser.password)
        if (!matchPassword) {
            throw "Invalid email and password!"
        }
        const token = generateToken(existUser)
        existUser.password = undefined
        res.send({
            user: existUser,
            token
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error
        })
    }
}
module.exports.userGetInfo = async (req, res) => {
    try {
        const token = req.user
        const user = await USERS.findOne({ email: token.email })
        user.password = undefined
        res.send(user)
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error.massage
        })
    }
}

// admin router

module.exports.getAllUsers = async (req, res) => {
    try {
        const result = await USERS.find({}).populate('circularApplied._id')
        res.status(200).send(result)
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error.massage
        })
    }
}
// module.exports.getAUser = async (req, res) => {
//     try {
//         res.status(200).json('success')
//     } catch (error) {
//         res.status(500).json({
//             status: 'fail',
//             massage: error.massage
//         })
//     }
// }
module.exports.updateUserRole = async (req, res) => {
    try {
        if (req.body.role != 'Candidate', 'Hiring Manager', 'Admin') {
            throw 'Invalid update user role'
        }
        const user = await USERS.updateOne({ email: req.body.email }, {
            role: req.body.role
        })
        res.send(user)
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error
        })
    }
}

module.exports.getAllCandidate = async (req, res) => {
    try {

        const user = await USERS.find({ role: 'Candidate' })
        res.send(user)
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error
        })
    }
}
module.exports.getACandidate = async (req, res) => {
    try {
        const user = await USERS.findOne({ role: 'Candidate', _id: req.params.id }).populate('circularApplied._id')
        res.send(user)
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error
        })
    }
}
module.exports.getAllHiringManagers = async (req, res) => {
    try {
        const user = await USERS.find({ role: 'Hiring Manager' })
        res.send(user)
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error
        })
    }
}


