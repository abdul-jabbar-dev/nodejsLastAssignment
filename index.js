const express = require('express')
const mongoose = require('mongoose')
const jobsRoute = require('./Router/Jobs.route')
const managerRoute = require('./Router/Manager.route')
const userRoute = require('./Router/User.route')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
app.use(express.json())
require('dotenv').config()
//database connection
const uri = process.env.MONGO_CONNECTION
mongoose.connect(uri, (error) => {
    console.log('DataBase connected')
})

app.use('/jobs', jobsRoute)
app.use('/users', userRoute)
app.use('/manager', managerRoute)

app.use('/', (req, res) => {
    res.send('connect (all routes and description in readme.md file)')
})

app.listen(PORT, (error) => console.log('server is connect on ' + PORT))
