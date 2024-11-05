// import request from "supertest";
// import app from "../app"; // Sesuaikan path sesuai kebutuhan

// describe("Auth Controller", () => {
//   test("should login successfully", async () => {
//     const response = await request(app)
//       .post("/login")
//       .send({ username: "admin", password: "password" });
//     expect(response.status).toBe(200);
//     expect(response.body.status).toBe("success");
//   });

//   test("should fail to login with wrong credentials", async () => {
//     const response = await request(app)
//       .post("/login")
//       .send({ username: "wrong", password: "wrong" });
//     expect(response.status).toBe(401);
//     expect(response.body.message).toBe("username atau password salah");
//   });

//   test("should logout successfully", async () => {
//     const response = await request(app).post("/logout");
//     expect(response.status).toBe(200);
//     expect(response.body.status).toBe("success");
//   });
// });
// ????

import request from "supertest";
import app from "../app"; // Pastikan path ke app.ts benar

describe("Auth Controller", () => {
  it("should login successfully with valid credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "admin",
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login berhasil");
  });

  it("should return 401 for invalid credentials", async () => {
    const response = await request(app).post("/login").send({
      username: "wrongUser",
      password: "wrongPassword",
    });

    console.log(response.body);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("username atau password salah");
  });
});
// !!!!!!!!!!!!!!
