const mongoose = require('mongoose')


const armamentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    img:{type:String},
    description:{type:String},
    owner:{type:String},
    videoGame:{type:String, required:true},
    creator:{type:String,required:true}
})

const Armament = mongoose.model('Armament',armamentSchema)

module.exports=Armament