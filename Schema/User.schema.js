const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: [true, 'This user already exist'],
        validate: [validator.isEmail, 'Provide a valid Email'],
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['Candidate', 'Hiring Manager', 'Admin'],
        default: 'Candidate'
    },
    circularApplied: [{
        _id: { type: mongoose.Types.ObjectId, ref: 'jobs' }
    }],
    postedCircular: [{
        name: String,
        email: String,
        phoneNumber: Number,
        _id: { type: mongoose.Types.ObjectId, ref: 'jobs' }
    }],
    password: {
        type: String,
        required: true,
        validator: {
            validate: (value) => {
                return validator.isStrongPassword(value, {
                    minLength: 6
                })
            }
        }
    },
    createAt: Date,
    updateAt: Date
}, {
    timestamps: true
})

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, parseInt(process.env.BCRYPT_SALT))
    next();
})


const USERS = mongoose.model('users', userSchema)
module.exports = USERS