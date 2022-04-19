const db = require('./db')
currentUname = ""

const jwt = require('jsonwebtoken')
const { set } = require('express/lib/application')
const res = require('express/lib/response')


const register = (uname, name, pswd) => {
    
    return db.User.findOne({ uname })
        .then(user => {
            if (user) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "User Already exists!!!! Please Log In"
                }
            }
            else {
                
                const newUser = new db.User({
                    uname,
                    name,
                    pswd,
                    lists: []
                })
                newUser.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: "Registered Successfully!!!!"
                }
            }
        })
}


const login = (uname, pswd) => {
    return db.User.findOne({uname, pswd })
        .then(user => {
            if (user) {
                let newUser = user.name
                let newUsername = user.uname
                return {
                    statusCode: 200,
                    status: true,
                    message: "Successfully log in!!!!",
                    newUser,
                    newUsername
                }
            }
            else {
                return {
                    statusCode: 422,
                    status: false,
                    message: "Incorrect Password/Username"
                }
            }
        })
}

const addEvent = (date, eventName, user) => {

    return db.User.findOne({ uname: user })
        .then(result => {
            if (result) {
                result.lists.push({
                    date: date,
                    event: eventName
                })
                result.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: "Success"
                }
            }
        })
}


const viewEvent = (user) => {

    

    return db.User.findOne({ uname: user })
        .then(user => {
            if (user) {
                return {
                    statusCode: 200,
                    status: true,
                    message: "Success",
                    events: user.lists
                }
            }
        })
}


const deleteEvent = (user,date,eventName) =>{
    return db.User.updateMany({uname:user},{$pull:{lists:{date:date,event:eventName}}})
    .then(result=>{
        if(result){
            return{
                statusCode: 200,
                status: true,
                message: "Success",
            }
        }
    })
}


const updateEvent = (uname,index,date,event)=>{

    let indexNum = parseInt(index)

    return db.User.findOne({uname})
    .then(user=>{
        user.lists[indexNum].date=date
        user.lists[indexNum].event=event
        user.markModified('lists')
        user.save()
        return{
            statusCode: 200,
            status: true,
            message: "Success",
        }
    })
}

module.exports = {
    register,
    login,
    addEvent,
    viewEvent,
    deleteEvent,
    updateEvent
}