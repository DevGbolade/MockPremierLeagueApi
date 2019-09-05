const express = require('express');
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../../app');
const User = require('../models/userModel')


const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!'
    
}



beforeEach(async () => {
    await User.remove()
    await new User(userOne).save()
})

test('Should signin an existing user', async () => {
    await request(app)
        .post('/api/v1/users/signin')
        .send({
            email: "mike@example.com",
            password: "56what!!",
        })
        .expect(200)
});

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/api/v1/users/signup')
        .send({
            name: "rozay adeniyi",
            email: "agbolade10@gmail.com",
            password: "mradeniyi"

        }).expect(201);
        console.log(response.body.token);
        
       
});



