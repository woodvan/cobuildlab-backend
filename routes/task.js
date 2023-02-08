const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.get("/:id", taskController.getTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/", taskController.deleteTask);

module.exports = router;
