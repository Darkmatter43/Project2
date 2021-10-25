const mongoose=require('mongoose')
const Armaments=require('./armaments.js')

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    arms:[Armaments.schema],
})

const User = mongoose.model('User',userSchema)
module.exports = User