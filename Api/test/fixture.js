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
//       console.log(res.body);
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
// describe("GET /fixtures", () => {
//   // token not being sent - should respond with a 401
//   it("It should respond with JSON", done => {
//     return request(app)
//       .get("/api/v1/fixtures/admin")
//       .then(response => {
//         console.log(response.body);
//         expect(response.statusCode).toBe(403);
//         done();
//       });
//   });
//   it("It should respond with JSON", done => {
//     return request(app)
//       .get("/api/v1/fixtures/admin")
//       .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", cookie)
//       .then(res => {
//         expect(res.statusCode).toBe(200);
//         expect(res.type).toBe("application/json");
//         done();
//       });
//   });
//   //   send the token - should respond with a 200
//   it("It should require authorization", done => {
//     return request(app)
//       .post("/api/v1/fixtures")
//       .send({
//         homeTeam: {
//           team_name: "Manchester United"
//         },
//         awayTeam: {
//           team_name: "Leicester City"
//         }
//       })
//       .set("Cookie", cookie)
//       .then(res => {
//         expect(res.status).toBe(403);
//         done();
//       });
//   });
//   it("It should return some properties", done => {
//     return request(app)
//       .get("/api/v1/fixture/5d549c7d803a502f9aae5f6c")
//       .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", cookie)
//       .then(res => {
//         expect(res.body.data).toHaveProperty(
//           "awayTeam.team_name",
//           "Tottenham Hotspur"
//         );
//         expect(res.statusCode).toBe(200);
//         done();
//       });
//   });
//   it("It should return all fixtures", done => {
//     return request(app)
//       .get("/api/v1/fixtures/admin")
//       .set("Authorization", `Bearer ${token}`)
//       .set("Cookie", cookie)
//       .then(res => {
//         expect(res.statusCode).toBe(200);
//         done();
//       });
//   });
//   it("it should update a team", done => {
//     return request(app)
//       .put("/api/v1/fixture/5d549c7d803a502f9aae5f6c")
//       .send({
//         score: {
//           halftime: "1-0",
//           fulltime: "1-1",
//           extratime: null,
//           penalty: null
//         },
//         homeTeam: {
//           team_name: "Newcastle United"
//         },
//         awayTeam: {
//           team_name: "Tottenham Hotspur"
//         }
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
//       .delete("/api/v1/fixture/5d549c7d803a502f9aae5f6c")
//       .set("Cookie", cookie)
//       .then(response => {
//         expect(response.statusCode).toBe(403);
//         done();
//       });
//   });
// });
