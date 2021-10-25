const mongoose = require('mongoose')


const armamentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    img:{type:String},
    description:{type:String},
    owner:{type:String},
    videoGame:{type:String, required:true},
    //tried to add a feature that displayed who had created which new weapon, but for some reason this was breaking something else. This one line of code prevent the created armaments to be pushed correctly to its creator's array of objects. weird!
    // creator:{type:String,required:true}
})

const Armament = mongoose.model('Armament',armamentSchema)

module.exports=Armament