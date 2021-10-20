const express=require('express')
const Armament = require('../models/armaments.js')
const armaments = express.Router()

//INDEX ROUTE
armaments.get('/',(req,res)=>{
    res.render('armaments/index.ejs')
})

//SEED ROUTE - This will remove ALL current content in the DB. Only use to reset to default.
armaments.get('/seed',(req,res)=>{
    Armament.collection.drop()
    Armament.create(
        [
            {
                name:'Buster Sword',
                description:'Larger than life',
                owner:'Cloud Strife'
            }
        ],
        (err,data)=>{
            res.redirect('/armaments')
        }
    )
})




module.exports=armaments