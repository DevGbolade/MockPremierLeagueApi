// import request from "supertest";
// import app from "../../app";
// import mongoose from "mongoose";

// const db = process.env.DB_HOST;

// describe("Test the admin method", () => {
//   beforeAll(() => {
//     mongoose.connect(db);
//   });
//   afterAll(done => {
//     mongoose.disconnect(done);
//   });
// });

// /*
//       declare the token variable in a scope accessible
//       by the entire test suite
//     */
// let token;
// let cookie;

// beforeAll(done => {
//   request(app)
//     .post("/api/v1/authenticate/email/admin/login")
//     .send({
//       email: "ejehgodfrey@gmail.com",
//       password: "magickiss"
//     })
//     .end((err, res) => {
//       if (err) {
//         console.log(err);
//       }
//       cookie = res.headers["set-cookie"][0]
//         .split(",")
//         .map(item => item.split(";")[0])
//         .join(";");
//       token = res.body.data.accessToken; // save the token!
//       done();
//     });
// });
// describe("GET /team", () => {
//   // token not being sent - should respond with a 401
//   it("It should require authorization", done => {
//     return request(app)
//       .get("/api/v1/teams/admin")
//       .then(response => {
//         expect(response.statusCode).toBe(403);
//         done();
//       });
//   });
//   it("It should respond with JSON", done => {
//     return request(app)
//       .get("/api/v1/teams/admin")
//       .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", cookie)
//       .then(res => {
//         expect(res.statusCode).toBe(200);
//         expect(res.type).toBe("application/json");
//         done();
//       });
//   });
//   // send the token - should respond with a 200
//   it("It should require authorization", done => {
//     return request(app)
//       .post("/api/v1/teams")
//       .send({
//         name: "Manchester United",
//         venue_name: "Old Trafford",
//         venue_surface: "grass",
//         venue_address: "Sir Matt Busby Way",
//         venue_city: "Manchester",
//         venue_capacity: 76212
//       })
//       .set("Cookie", cookie)
//       .then(res => {
//         expect(res.status).toBe(403);
//         done();
//       });
//   });
//   it("It should return some properties", done => {
//     return request(app)
//       .get("/api/v1/team/admin/5d5a8098ecb8950e8df139c4")
//       .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", cookie)
//       .then(res => {
//         expect(res.body.data.name).toBe("Manchester United");
//         expect(res.statusCode).toBe(200);
//         done();
//       });
//   });

//   it("it should update a team", done => {
//     return request(app)
//       .put("/api/v1/teams/5d5a8098ecb8950e8df139c4")
//       .send({
//         name: "Manchester United",
//         code: 4563,
//         country: "England",
//         founded: "1878",
//         venue_name: "Old Trafford",
//         venue_surface: "grass"
//       })
//       .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", cookie)
//       .then(response => {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//   });
//   it("it should require authorization", done => {
//     return request(app)
//       .delete("/api/v1/teams/5d5a8098ecb8950e8df139c4")
//       .set("Cookie", cookie)
//       .then(response => {
//         expect(response.statusCode).toBe(403);
//         done();
//       });
//   });
// });
