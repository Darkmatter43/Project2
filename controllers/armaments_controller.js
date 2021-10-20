const express=require('express')
const Armament = require('../models/armaments.js')
const armaments = express.Router()

//INDEX ROUTE
armaments.get('/',(req,res)=>{
    Armament.find({},(err,allArmaments)=>{
        res.render('armaments/index.ejs',{
            armaments: allArmaments
        })
    })
    
})

//SEED ROUTE - This will remove ALL current content in the DB. Only use to reset to default.
armaments.get('/seed',(req,res)=>{
    Armament.collection.drop()
    Armament.create(
        [
            {
                name:'Buster Sword',
                description:'Larger than life',
                owner:'Cloud Strife',
                videoGame:'Final Fantasy VII'
            },
            {
                name:'Master Sword',
                description:'A sword powerful enough to banish evil',
                owner:'Link',
                videoGame:'Legend of Zelda Franchise'
            },
            {
                name:'Keyblade',
                description:'A mysterious weapon that chooses its master',
                owner:'Sora',
                videoGame:'Kingdom Hearts'
            },
            {
                name:'Portal Gun',
                description:'A device that shoots beams of light that can create portals on impact. These portals allow all objects that fit through it to travel between them, conserving momentum as they do',
                owner:'Chell',
                videoGame:'Portal'
            }
        ],
        (err,data)=>{
            res.redirect('/armaments')
        }
    )
})




module.exports=armaments