const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        firstname:{type:String,require:true},
        lastname:{type:String,require:true},
        email:{type:String,require:true,unique:true},
        password:{type:String,require:true},
        role:{type:String,default:'user'},
        active:{type:Boolean,default:true},
        createdAt:{type:Date,default:new Date()},
        updatedAt:{type:Date,default:new Date()}
})

module.exports = mongoose.model('user',userSchema)

