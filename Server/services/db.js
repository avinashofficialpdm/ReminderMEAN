
// To give Mongo  db connection details

//mongoose import
const mongoose = require('mongoose')

//state connection string
mongoose.connect('mongodb://localhost:27017/reminderApp', {
    useNewUrlParser: true
})

//model creation
const User = mongoose.model('User', {
    index:Number,
    uname: String,
    name: String,
    pswd: String,
    lists: []
})

//export model - User
module.exports = {
    User
}