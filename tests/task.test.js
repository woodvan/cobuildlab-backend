const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const apiRoutes = require("../routes/api.routes");
const app = express();
app.use(express.json());
app.use("/api", apiRoutes);
const { getAuthReference } = require("../config/firebase");
const auth = getAuthReference();
const rp = require('request-promise');

const getIDToken = async () => {
  const uid = "jKuLaXjq0mRND6ChtgqJbpBu8fC2";
  const customToken = await auth.createCustomToken(uid)
  const res = await rp({
    url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`,
    method: 'POST',
    body: {
      token: customToken,
      returnSecureToken: true
    },
    json: true,
  });
  return res.idToken;
};

beforeAll(async () => {
  await mongoose
    .set("strictQuery", true)
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("Error connecting to DB", err.message);
    });
});

afterAll(async () => {
  await mongoose.connection.close().then(() => {
    console.log("Disconnected");
  });
});

describe("GET /api/task/:id", () => {
  it("should return all tasks", async () => {
    const token = await getIDToken();
    const res = await request(app)
      .get("/api/task/jKuLaXjq0mRND6ChtgqJbpBu8fC2")
      .set({ Authorization: `Bearer ${token}` })
      .send();
    expect(res.status).toBe(200);
  });
});

describe("POST /api/task/", () => {
  it("should create a task", async () => {
    const token = await getIDToken();
    const res = await request(app)
      .post("/api/task")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title: "Task 2",
        description: "Description for Task 2",
        done: false,
        userId: "jKuLaXjq0mRND6ChtgqJbpBu8fC2",
      });
    expect(res.status).toBe(200);
  });
});

describe("PUT /api/task/:id", () => {
  it("should update a task", async () => {
    const token = await getIDToken();
    const res = await request(app)
      .put("/api/task/63ea4c85faf82e5381fdbe46")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        title: "Task 4",
        description: "Description for task",
      });
    expect(res.status).toBe(200);
  });
});
