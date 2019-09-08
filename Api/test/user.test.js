const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app');
const User = require('../models/userModel')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Gbolade Adeniyi',
    email: 'Gboladeadeniyi@example.com',
    password: 'mradeniyi',
    
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

  it("It should respond the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });




test('Should signup a new user', async () => {
    const response = await request(app).post('/api/v1/auth/signup').send({
        name: 'Funke Bernard',
        email: 'funkebernard@example.com',
        password: 'funkeberbard'
    }).expect(201)

    
    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
        expect(user).toHaveProperty('name', 'Funke Bernard')
        expect(user).toHaveProperty('email', 'funkebernard@example.com')
        expect(user).toHaveProperty('role', 'user')
        expect(user.password).not.toBe('funkebernard')
  
})


test('Should login existing user', async () => {
    const response = await request(app).post('/api/v1/auth/signin').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body).toHaveProperty('token');
})

// test('Should not login nonexistent user', async () => {
//    const response = await request(app).post('/api/v1/auth/signin').send({
//         email: 'adaraey@gmail.com',
//         password: 'thisisnotmypass'
//     });
//     expect(response.statusCode).toBe(400);
// })

