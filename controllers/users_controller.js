const express = require('express')
const User = require('../models/users.js')
const users=express.Router()
const bcrypt = require('bcrypt')
const Armaments = require('../models/armaments.js')


const isAuthenticated=(req,res,next)=>{
    if(req.session.currentUser){
        return next()
    }else{
        res.redirect('/sessions/new')
    }
}

//NEW ROUTE
users.get('/new',(req,res)=>{
    res.render('users/new.ejs',{
        currentUser:req.session.currentUser
    })
})

users.put('/:id',(req,res)=>{
    User.findByIdAndUpdate(req.session.currentUser._id,req.body,{new:true},(err,updatedUser)=>{
        User.findOne(req.session.currentUser,(err,foundUser)=>{
            console.log(foundUser)
            foundUser.arms.splice(req.params.id,1)
            foundUser.save((err,data)=>{
                res.redirect('/')
            })
            
        })
    })
})

//For some reason, even if I manually type in anohter user's name here, I only get the current logged in user's page to show up. I have yet to figure out where this issue comes from. 
//SHOW ROUTE
users.get('/:id',isAuthenticated,(req,res)=>{
    User.findOne({username:req.params.id},(err,foundUser)=>{
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

//DELETE ROUTE
users.delete('/:id',isAuthenticated,(req,res)=>{
    // First solution:This removes the item from the array and thus is removed from the page, but the change is not translated to the DB. Time to try again!
    // User.find(req.session.currentUser,(err,currentUser)=>{
    // req.session.currentUser.arms.splice(req.params.id,1),
    //     res.redirect('/')
    // })
    //What I was trying to do is better suited for an update route. This now deletes the user! Nifty.
    User.findOneAndRemove(req.session.currentUser,(err,deletedUser)=>{
        res.redirect('/')
    })

})

module.exports= users