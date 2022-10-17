const jwt = require('jsonwebtoken')
module.exports = (user) => {
    const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(userData, process.env.PRIVET_KEY, { expiresIn: '7days' });
    return token;
}