const express = require('express')
const User = require('../models/users.js')
const users=express.Router()
const bcrypt = require('bcrypt')

//INDEX ROUTE
users.get('/new',(req,res)=>{
    res.render('users/new.ejs',{
        currentUser:req.session.currentUser
    })
})

//SHOW ROUTE
users.get('/:id',(req,res)=>{
    User.findById(req.session.currentUser.username,(err,foundUser)=>{
        res.render('users/show.ejs',
            {user:foundUser,
            currentUser:req.session.currentUser
        })
    })
})

//POST ROUTE
users.post('/',(req,res)=>{
    req.body.password=bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    User.create(req.body,(err,createdUser)=>{
        console.log(createdUser)
        res.redirect('/')
    })
})

module.exports= users