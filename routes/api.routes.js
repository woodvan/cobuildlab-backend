const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/auth.middlewares");

const tasksApiRouter = require("./task");

router.use("/task", authMiddlewares.verifyToken, tasksApiRouter);

module.exports = router;
