const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app');
const User = require('../models/userModel')
const Team = require('../models/teamModel')



let token;

describe("Test the admin method", () => {
    beforeAll(() => {
      mongoose.connect(db);
    });
    afterAll(done => {
      mongoose.disconnect(done);
    });
  });



beforeAll(async () => {
    const response = await request(app)
     .post("/api/v1/auth/signin")
     .send({
        email: 'Gboladeadeniyi@example.com',
        password: 'mradeniyi',
     })
 
     token = response.body.token;
     
     
 });

 describe("GET /team", () => {
    it("It should require authorization get all teams", done => {
      return request(app)
        .get("/api/v1/teams")
        .then(response => {
          expect(response.statusCode).toBe(500);
          done();
        });
    });

    it("It should respond with JSON", done => {
      return request(app)
        .get("/api/v1/teams")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.type).toBe("application/json");
          done();
        });
    });

    it("It should require authorization to add a team", done => {
      return request(app)
        .post("/api/v1/teams")
        .send({
        	teamName: "Manchester City",
            manager: "Pep Guardiola",
            website: "http://www.manchestercity.com/",
            stadium: "Etihad stadium"
        })
        .then(res => {
          expect(res.status).toBe(500);
          done();
        });
    });

    it("It should return a team with the given id", done => {
      return request(app)
        .get("/api/v1/teams/5d755420c2a1102c6820caba")
        .set("Authorization", `Bearer ${token}`)
        .then(res => {
          expect(res.body.data.team.teamName).toBe("manchester city");
          expect(res.body.data.team.manager).toBe("Pep Guardiola");     
          expect(res.statusCode).toBe(200);
          done();
        });
    });
  
  

    it("it should require authorization to delete a team", done => {
      return request(app)
        .delete("/api/v1/teams/5d755420c2a1102c6820caba")
        .then(response => {
          expect(response.statusCode).toBe(500);
          done();
        });
    });
  });
