const express = require('express')
const User = require('../models/users.js')
const sessions=express.Router()
const bcrypt = require('bcrypt')

sessions.get('/new',(req,res)=>{
    res.render('sessions/new.ejs',{currentUser:req.session.currentUser})
})

sessions.post('/',(req,res)=>{
    User.findOne({username:req.body.username},(err,foundUser)=>{
        if(err){
            res.send('Something Exploded! Try again.')
        }else if(!foundUser){
            res.send('<a href="/">User not found.</a>')
        }else{
            if(bcrypt.compareSync(req.body.password,foundUser.password)){
                req.session.currentUser = foundUser
                res.redirect('/')
            }else{
                res.send('<a href="/sessions/new">Incorrect Password</a>')
            }
        }
    })
})

sessions.delete('/',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

module.exports=sessions