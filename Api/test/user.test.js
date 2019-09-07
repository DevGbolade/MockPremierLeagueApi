const express = require('express');
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../../app');
const User = require('../models/userModel')


// const userOneId = new mongoose.Types.ObjectId()

// const userOne = {
//     _id: userOneId,
//     name: 'Agbolade Adeniyi',
//     email: 'raadeniyi3@gmail.com',
//     password: 'sterlingbank'
    
// }



// beforeEach(async () => {
//     await User.deleteMany()
//     await new User(userOne).save()
// })

// const defaultuser = {
//     _id: "5d719097dfd33a3b80a71adf",
//     role: "user",
//     email:"raadeniyi3@gmail.com",
//     name: "Agbolade Adeniyi",
//     password: "$2a$12$0KMRYkcY.GQnolNX/LkO5edo1yzer0hX17U.ozFJ4nZnmZ.juMC9q",
//     dateCreated: "2019-09-05T22:47:55.891+00:00"
// };

// test('Should signup a new user', async () => {
//     const response = await request(app).post('/api/v1/users/signup').send({
//         name: 'mr test',
//         email: 'mrtest@test.com',
//         password: 'testtesttest'
//     }).expect(201)

//     expect(response.body).toHaveProperty('token')

//     // Assert that the database was changed correctly
//     const user = await User.findById(response.body.data.data._id)
//     expect(user).toHaveProperty('name', 'mr test')
//     expect(user).toHaveProperty('email', 'mrtest@test.com')
//     expect(user).toHaveProperty('role', 'user')
//     expect(user.password).not.toBe('password','testtesttest')

// })

// import request from "supertest";
// import app from "../../src/app";
// import mongoose from "mongoose";

// const db = process.env.DB_HOST;

// jest.setTimeout(30000);

describe("Test the user method", () => {
  beforeAll(() => {
    mongoose.connect(db);
  });
  afterAll(done => {
    mongoose.disconnect(done);
  });
});

  it("It should respond the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

/*
      declare the token variable in a scope accessible
      by the entire test suite
    */
let token;
let cookie;

  

//   const response = await request(app)
//                   .post('/api/v1/users/signup')
//                   .send({
//                     name: 'mr test',
//                     email: 'mrtest@test.com',
//                     password: 'testtesttest'})
//                   .expect(201);
//                   console.log(response.body);
          

// describe("GET /admins", () => {
//   // token not being sent - should respond with a 401
//   test("It should respond with JSON", async done => {
//     return request(app)
//       .get("/api/v1/users")
//       .then(response => {
//         expect(response.statusCode).toBe(403);
//         done();
//       });
//   });
//   //   token not being sent - should respond with a 401
//   test("It should require authorization", done => {
//     return request(app)
//       .get("/api/v1/users")
//       .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", cookie)
//       .then(response => {
//         expect(response.status).toBe(200);
//         expect(response.type).toBe("application/json");
//         done();
//       });
//   });

//   test("It should return some properties", done => {
//     return request(app)
//       .get("/api/v1/user/5d5ae33cc385940596e173a0")
//       .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", cookie)
//       .then(response => {
//         expect(response.body.data).toHaveProperty("id");
//         expect(response.body.data).toHaveProperty("email");
//         expect(response.body.data).toHaveProperty("password");
//         done();
//       });
//   });
//   test("it should update admin", done => {
//     return request(app)
//       .put("/api/v1/user")
//       .send({
//         firstName: "Godfrey",
//         lastName: "ejeh"
//       })
//       .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", cookie)
//       .then(response => {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   });
// });
