const Task = require("../models/Task");
const buildError = require("../utils/errorBuilder");

module.exports = {
  getTasks: async (req, res, next) => {
    const auth = req.currentUser;
    const id = req.params.id;
    try {
      if (auth) {
        let task = await Task.find({
          userId: id,
          done: false,
        });
        let done = await Task.find({
          userId: id,
          done: true,
        });
        res.json({
          status: 200,
          data: [task, done],
        });
      } else {
        return next(buildError("Invalid Request", 400));
      }
    } catch (err) {
      return next(buildError(err, err.status || 500));
    }
  },

  createTask: async (req, res, next) => {
    const auth = req.currentUser;

    try {
      if (auth) {
        const newTask = new Task({
          title: req.body.title,
          description: req.body.description,
          done: false,
          userId: req.body.userId,
        });

        const task = await newTask.save();

        res.json({
          status: 200,
          data: task,
        });
      } else {
        return next(buildError("Invalid Request", 400));
      }
    } catch (err) {
      return next(buildError(err, err.status || 500));
    }
  },

  updateTask: async (req, res, next) => {
    const auth = req.currentUser;
    try {
      if (auth) {
        const taskToUpdate = await Task.findById(req.params.id);
        if (!taskToUpdate) throw buildError("No task found", 500);

        if (req.body.title) taskToUpdate.title = req.body.title;
        if (req.body.description)
          taskToUpdate.description = req.body.description;
        taskToUpdate.done = req.body.done;

        await taskToUpdate.save();

        res.json({
          status: 200,
          data: taskToUpdate,
        });
      } else {
        return next(buildError("Invalid Request", 400));
      }
    } catch (err) {
      return next(buildError(err, err.status || 500));
    }
  },
  deleteTask: async (req, res, next) => {
    try {
      const taskToRemove = await Task.findByIdAndRemove(req.body.id);
      if (!taskToRemove) throw buildError("No task found", 500);
      res.json({
        status: 200,
      });
    } catch (err) {
      return next(buildError(err, err.status || 500));
    }
  },
};
