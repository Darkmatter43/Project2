const express=require('express')
const Armament = require('../models/armaments.js')
const armaments = express.Router()

const isAuthenticated=(req,res,next)=>{
    if(req.session.currentUser){
        return next()
    }else{
        res.redirect('/sessions/new')
    }
}

//INDEX ROUTE
armaments.get('/',(req,res)=>{
    Armament.find({},(err,allArmaments)=>{
        res.render('armaments/index.ejs',{
            armaments: allArmaments,
            currentUser:req.session.currentUser
        })
    })
    
})

//EDIT ROUTE
armaments.get('/:id/edit',(req,res)=>{
    Armament.findById(req.params.id,(err,foundArmament)=>{
        res.render('armaments/edit.ejs',{
            armament:foundArmament,
        })
    })
})

//NEW ROUTE
armaments.get('/new',(req,res)=>{
    res.render('armaments/new.ejs')
})

//SHOW ROUTE
armaments.get('/:id',(req,res)=>{
    Armament.findById(req.params.id,(err,foundArmament)=>{
        res.render('armaments/show.ejs',
            {armament:foundArmament,
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
                img:'https://i.imgur.com/KqULY4u.jpeg',
                owner:'Cloud Strife',
                videoGame:'Final Fantasy VII'
            },
            {
                name:'Master Sword',
                description:'A sword powerful enough to banish evil',
                img:'https://images-na.ssl-images-amazon.com/images/I/51N6jLGIGrL.__AC_SY445_SX342_QL70_ML2_.jpg',
                owner:'Link',
                videoGame:'Legend of Zelda Franchise'
            },
            {
                name:'Keyblade',
                description:'A mysterious weapon that chooses its master',
                img:'https://m.media-amazon.com/images/I/71Asij72cwL._AC_SX425_.jpg',
                owner:'Sora',
                videoGame:'Kingdom Hearts'
            },
            {
                name:'Portal Gun',
                description:'A device that shoots beams of light that can create portals on impact. These portals allow all objects that fit through it to travel between them, conserving momentum as they do',
                img:'https://media.sketchfab.com/models/afd9a04e7c704846bc8f25ec81f57a4e/thumbnails/1cb7d43397cc48978cc89ddc5e90de71/b2765f87d3524b5d93ae8c8491d7c20a.jpeg',
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