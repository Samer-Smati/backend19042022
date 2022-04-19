const express = require('express');

const user = express.Router();

const {getUsers,addUser,removeUser,updateUser,banUser,getOneUser} = require('../controllers/users.controllers')

// get users
user.get('/users',getUsers)

//get one user
user.get('/users/:id',getOneUser)

// create user
user.post('/createUser', addUser)

// delete user
user.delete('/deleteUser/:id',removeUser)

//update user
user.patch('/updateUser/:id',updateUser)

//ban user
user.patch('/BanUser/:id',banUser)

module.exports = user;