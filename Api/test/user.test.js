const express = require('express');
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../../app');
const User = require('../models/userModel')

const server = express();

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    
}

server.post('/api/v1/users/signin', (req, res) =>{
    res.status(200).json({name:"test"});
})
// beforeEach(async () => {
//     // await User.deleteMany()
//     await new User(userOne).save()
// })

test('Should signin an existing user', (done) => {
    request(server)
        .post('/api/v1/users/signin')
        .send({
        email: "mike@example.com'",
        password: "56what!!",
        
    })
    .expect(404, done)
});
// npm install jest supertest @types/jest @types/supertest
// describe('hhhhhhhhhh', () =>  {
    // test('it should return 200', async () =>{
    //     const response = await request(app)
    //     .get('/');
    //     expect(response.statusCode).toBe(200)
     
    // })

// })

