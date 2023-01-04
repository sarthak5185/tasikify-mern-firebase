const express = require("express");
const {
  home,
  createTodo,
  getTodo,
  editTodo,
  deleteTodo,
  getTasks,
  createTask,
  deleteTasks,
  editTasks,
  completedTask
} = require("../controllers/TodoController");
const router = express.Router();
router.get("/",home);
router.post("/createTodo",createTodo);
router.get("/getTodo/:id",getTodo);
router.post("/editTodo/:id",editTodo);
router.delete("/deleteTodo/:id",deleteTodo);

router.get("/getTasks/:id",getTasks);
router.post("/createTask/:id",createTask);
router.delete("/deleteTasks/:id",deleteTasks);
router.post("/editTasks/:id",editTasks);
router.post("/completedTask/:id", completedTask);


module.exports = router;