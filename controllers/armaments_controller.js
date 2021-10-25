const express=require('express')
const Armament = require('../models/armaments.js')
const armaments = express.Router()
const User = require('../models/users.js')

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
armaments.get('/:id/edit',isAuthenticated,(req,res)=>{
    Armament.findById(req.params.id,(err,foundArmament)=>{
        res.render('armaments/edit.ejs',{
            armament:foundArmament,
            currentUser:req.session.currentUser
        })
    })
})

//UPDATE ROUTE
//Using quite a bit of code from the markdown here.
armaments.put('/:id',(req,res)=>{
    //Finding and updating I was able to do before!
    Armament.findByIdAndUpdate(req.params.id,req.body,{new:true},(err,updatedArmament)=>{
    //here is some new stuff...
        User.find({'armaments._id':req.params.id},(err,foundUser)=>{
            foundUser.arms.id(req.params.id).remove()
            foundUser.arms.push(updatedArmament)
            foundUser.save((err,data)=>{
                res.redirect('/')
            })
        })
    })
})

//NEW ROUTE
armaments.get('/new',isAuthenticated,(req,res)=>{
    res.render('armaments/new.ejs',{
        currentUser:req.session.currentUser
    })
})

//CREATE ROUTE
//I am using a slightly modified version of the example given from one of the markdowns on creating relationships between models. I had to create a new post route just for this feature, because without it, anything using the post route would send null objects into the user's array and break some stuff. I might have been able to handle that differently, but this was the first and most simple solution I could think of. 
armaments.post('/new',(req,res)=>{
    User.findById(req.session.currentUser._id,(err,foundUser)=>{
        Armament.create(req.body,(err,createdArmament)=>{
            foundUser.arms.push(createdArmament)
            foundUser.save((err,data)=>{
                res.redirect('/')
            })
        })
    })
})
armaments.post('/',(req,res)=>{
    Armament.create(req.body,(err,createdArmament)=>{
        res.redirect('/')
    })
    
})

//DELETE ROUTE
//I do not want to remove the item from the user's page if it is deleted off of the index. Deleting off index should remove from the INDEX ONLY.
armaments.delete('/:id',isAuthenticated,(req,res)=>{
    Armament.findByIdAndRemove(req.params.id,(err,deletedArmament)=>{
        res.redirect('/')
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
                videoGame:'Final Fantasy VII',
                creator:'Darkmatter43'
            },
            {
                name:'Master Sword',
                description:'A sword powerful enough to banish evil',
                img:'https://images-na.ssl-images-amazon.com/images/I/51N6jLGIGrL.__AC_SY445_SX342_QL70_ML2_.jpg',
                owner:'Link',
                videoGame:'Legend of Zelda Franchise',
                creator:'Darkmatter43'
            },
            {
                name:'Keyblade',
                description:'A mysterious weapon that chooses its master',
                img:'https://m.media-amazon.com/images/I/71Asij72cwL._AC_SX425_.jpg',
                owner:'Sora',
                videoGame:'Kingdom Hearts',
                creator:'Darkmatter43'
            },
            {
                name:'Portal Gun',
                description:'A device that shoots beams of light that can create portals on impact. These portals allow all objects that fit through it to travel between them, conserving momentum as they do',
                img:'https://media.sketchfab.com/models/afd9a04e7c704846bc8f25ec81f57a4e/thumbnails/1cb7d43397cc48978cc89ddc5e90de71/b2765f87d3524b5d93ae8c8491d7c20a.jpeg',
                owner:'Chell',
                videoGame:'Portal',
                creator:'Darkmatter43'
            }
        ],
        (err,data)=>{
            res.redirect('/armaments')
        }
    )
})


//SHOW ROUTE
armaments.get('/:id',(req,res)=>{
    Armament.findById(req.params.id,(err,foundArmament)=>{
        res.render('armaments/show.ejs',
            {armament:foundArmament,
            currentUser:req.session.currentUser
        })
    })
})

module.exports=armaments