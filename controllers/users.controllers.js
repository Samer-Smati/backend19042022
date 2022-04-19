const userSchema = require('../models/users.models')
const bcrypt = require('bcrypt');

exports.getUsers =  async (req, res) => {
    try {
        const users = await userSchema.find();
        return users ? res.status(200).send(users) : res.status(400).send({msg:'Users don\'t exists'})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.getOneUser =  async (req, res) => {
    const {id} = req.params
    try {
        const users = await userSchema.findById(id);
        return users ? res.status(200).send(users) : res.status(400).send({msg:'Users don\'t exists'})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.addUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const userExists = await userSchema.findOne({email: email});
        if(userExists){
            return res.status(400).send({message: 'User already exists'})
        }
        const newUser = new userSchema(req.body)
        const passwordHashed = bcrypt.hashSync(password,10)
        newUser.password = passwordHashed;
        await newUser.save()
        return res.status(200).send({message: 'User added successfully'})
    } catch (error) {
        return res.status(500).send({message: error})
    }
}

exports.removeUser = async (req,res) =>{
    const {id} = req.params
    try {
        const user = await userSchema.findByIdAndDelete(id);
        if(!user){
            return res.status(400).send({msg:'User not exists'})
        }
        return res.status(200).send({message: 'User deleted successfully'})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.updateUser = async (req,res) =>{
    const {id} = req.params
    try {
        const user = await userSchema.findByIdAndUpdate(id, { $set: { ...req.body }});
        if(!user){
            return res.status(400).send({msg:'User not exists'})
        }
        return res.status(200).send({message: 'User Updated successfully',user})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.banUser = async (req,res) =>{
    const {id} = req.params
    try {
        const user = await userSchema.findByIdAndUpdate(id, { $set: { active:false,updatedAt:new Date() }});
        if(!user){
            return res.status(400).send({msg:'User not exists'})
        }
        return res.status(200).send({message: 'User banned successfully'})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}