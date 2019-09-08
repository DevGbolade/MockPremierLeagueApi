const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app');
const User = require('../models/userModel')
const Fixture = require('../models/fixtureModel')



let token;

beforeAll(async () => {
    const response = await request(app)
     .post("/api/v1/auth/signin")
     .send({
        email: 'Gboladeadeniyi@example.com',
        password: 'mradeniyi',
     })
 
     token = response.body.token;
     
 });

describe("Authorization test on all the fixtures endpoints ", () => {

    it("It should require authorization get all fixtures", done => {
      return request(app)
        .get("/api/v1/fixtures")
        .then(response => {
          expect(response.statusCode).toBe(500);
          done();
        });
    });

    it("It should get all fixtures ", done => {
      return request(app)
        .get("/api/v1/fixtures")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.type).toBe("application/json");
          
          done();
        });
    });

    it("It should require authorization to create a fixture", done => {
      return request(app)
        .post("/api/v1/fixtures")
        .send({
            
                homeTeam: "Manchester City",
                awayTeam: "Chelsea",
                matchDate: "12-06-2019",
                matchWeek: 2,
                matchTime: "13:00",
                matchStadium: "Etihad Stadium"   
        })
        .then(res => {
          expect(res.status).toBe(500);
          done();
        });
    });

    it("It should return a fixture with the given id", done => {
      return request(app)
        .get("/api/v1/fixtures/5d7549ebd5be5a3bf0021abb")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {

        expect(res.statusCode).toBe(200);
        expect(res.body.data.fixture).toHaveProperty('homeTeam','liverpool')
        expect(res.body.data.fixture).toHaveProperty('awayTeam', 'man united')
        expect(res.body.data.fixture).toHaveProperty('matchStatus', 'pending')        
          done();
        });
    });



    it("it should require authorization to delete a fixture", done => {
      return request(app)
        .delete("/api/v1/fixtures/5d7549ebd5be5a3bf0021abb")
        .then(response => {
          expect(response.statusCode).toBe(500);
          done();
        });
    });
  });
  