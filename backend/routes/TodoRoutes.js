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
} = require("../controllers/TodoController");
const router = express.Router();
router.get("/",home);
router.post("/createTodo",createTodo);
router.get("/getTodo",getTodo);
router.post("/editTodo/:id",editTodo);
router.delete("/deleteTodo/:id",deleteTodo);
router.get("/getTasks/:id",getTasks);
router.post("/createTask/:id",createTask);
// router.post("/editTask/:id/:idx",editTask);
router.delete("/deleteTodo/:id",deleteTodo);
router.delete("/deleteTasks/:id/:idx",deleteTasks);

module.exports = router;