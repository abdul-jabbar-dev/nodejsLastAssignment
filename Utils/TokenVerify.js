const USERS = require("../Schema/User.schema")
const jwt = require('jsonwebtoken')
 async function TokenVerify(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            throw "Token required"
        }
        const decoded = jwt.decode(token)
        if (decoded == null) {
            throw "invalid Token"
        }
        const user = await USERS.findOne({ email: decoded.email })
        user.password = undefined
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            massage: error.massage
        })
    }
}
module.exports = TokenVerify