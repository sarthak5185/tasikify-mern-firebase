// LOGIC, BL
const Todo = require("../models/Todomodel");

exports.home = (req, res) => {
  res.send("Hello Todo");
};

exports.createTodo = async (req, res) => {
    //1.DEREFRENCE THE TITLE FROM THE BODY
    //2.CHECK IF TITLE IS EMPTY OR NOT
    //3.IF TITLE IS VALID CHECK IF ENTRY EXISTS IN DATABASE
    //4.INSERT TODO WITHT THE TITLE AND EMPTY ARRAY OF TASKS
    //5.SEND RESPONSE IN JSON FORMAT TO 201 MEANING SUCESS
    //5.IF ERROR OCCURS THROW THE ERROR
  try {
    const {title,userId} = req.body;
    let tasks=[];
    // To check all the details
    const TodoExits = await Todo.findOne({title});
    if (TodoExits) {
      throw new Error("title exists");
    }
    // Inserting into the Database
    const todo = await Todo.create({title,userId});
    res.header("Access-Control-Allow-Origin", "*");
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      todo
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTodo = async (req, res) => {
  //1.USING FIND GET ALL TODOS
  //2.SEND IT TO JSON FORMAT TO FRONTEND
  try {
    const userid=req.params.id;
    const todos = await Todo.find({userId:userid});
    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
exports.editTodo = async (req, res) => {
  //1.ID IS PASSED AS PARAMETERS TO THE BACKEND FETCH IT USING REQ.PARAMS.ID
  //2.UPDATION using FINDBYIDANDUPDATE
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Todo updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todoid = req.params.id;
    const deltodo = await Todo.findByIdAndDelete(todoid);
    res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTasks=async(req,res)=>{
try
{
  const {id} = req.params;
  const checkTodoExists = await Todo.findById(id);
  if(!checkTodoExists)
      throw new Error("no such tasks exists");
  
  const todo = await Todo.findById(id);
  const tasks = todo.tasks;
  res.status(200).json({
      success: true,
      message: "tasks successfully retrieved",
      tasks
})
}
catch(error)
{
  res.status(401).json({
      success: false,
      message: error.message,
  });
}};
exports.createTask=async(req,res)=>{
  try {
    const todoId = req.params.id;
    const {task} = req.body;
    if(task){
    const tasks = await Todo.findByIdAndUpdate(todoId, {$addToSet : {"tasks" : {'task' :task}} });
    res.status(201).json({
        success:true,
        message:"task Created Successfully"
    });
}
else if(!task){
    res.status(401).json({
        success:false,
        message:"Enter Task"
    });
}
} catch (error) {
    
}

};
exports.deleteTasks=async(req,res)=>{
  const id = req.params.id;
  const todoid=id.split("_")[0];
  const taskid=id.split("_")[1];
  console.log(`todo id:${todoid}`);
  console.log(`task id:${taskid}`);
  const getTodoarr = await Todo.findById(id.split("_")[0]);
  console.log(getTodoarr);
  let delArray = getTodoarr.tasks.filter(x => x._id != taskid);
  getTodoarr.tasks = delArray;
  await Todo.findByIdAndUpdate(id.split("_")[0],getTodoarr);
  let narr=await Todo.findById(id.split("_")[0]);
  res.status(201).json({
      success:true,
      message:"Task Deleted Successfully",
      narr
  })
};
exports.editTasks=async(req,res)=>{
  const id = req.params.id;
    // split id to findandUpdate
    const todoId=id.split("_")[0];
    const taskId=id.split("_")[1];
    // capture task value
    const task = req.body.task;    
    const updateTask = await Todo.findOneAndUpdate({_id:id.split("_")[0], "tasks._id":id.split("_")[1]}, { $set: { "tasks.$.task":task,"tasks.$.taskCompleted":false}});
    res.status(201).json({
        success:true,
        message:"Task Updated Successfully"
    })
}
exports.completedTask = async(req, res) => {
  const id = req.params.id;
  // split id to findandUpdate
  const todoId=id.split("_")[0];
  const taskId=id.split("_")[1];

  // capture task value
  const task = req.body.task;
  const updateTask = await Todo.findOneAndUpdate({_id:todoId, "tasks._id":taskId}, { $set: { "tasks.$.taskCompleted":true}});
  res.status(201).json({
      success:true,
      message:"Task Completed Succesfully",
  })
};
