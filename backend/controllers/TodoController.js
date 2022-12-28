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
    const {title} = req.body;
    let tasks=[];
    // To check all the details
    const TodoExits = await Todo.findOne({title});
    if (TodoExits) {
      throw new Error("title exists");
    }
    // Inserting into the Database
    const todo = await Todo.create({title,tasks});
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
    const todos = await Todo.find();
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
//DEREFRENCE ID FROM PARAMETERS
// CHECK IF TODO ALREADY EXISTS
// IF EXISTS THRW

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
try
{
  const {id} = req.params;
  const{tasktitle}=req.body;
  const checkTodoExists = await Todo.findById(id);
  if(!checkTodoExists)
  {
    throw new Error("no such todo exists");
  }
  await Todo.updateOne(
    { _id: id },
    { $push: { tasks:tasktitle } }
 )
const todo=await Todo.findById(id);
  res.status(200).json({
      success: true,
      message: "tasks successfully added",
      todo
  })
}
catch(error) 
{
  res.status(401).json({
      success: false,
      message:error.message,
  })
}
};
// exports.editTask=async(req,res)=>{
// try
// {
//   const {id,idx} = req.params;
//   const{tasktitle}=req.body;
//   const checkTodoExists = await Todo.findById(id);
//   if(!checkTodoExists)
//   {
//     throw new Error("no such todo exists");
//   }
//   const todo = await Todo.findById(id);
//   const tasksarray=todo.tasks;
//   tasksarray[idx].title=tasktitle;
//   res.status(200).json({
//     success:true,
//     todo
//   })
// }
// catch(error) {
//   res.status(401).json({
//     success:false,
//     message:error.message
//   })
// }
// };
exports.deleteTasks=async(req,res)=>{
  try
  {
    const todoid=req.params.id;
    const taskidx=req.params.idx;
    const todo = await Todo.findById(todoid);
    const urlstring=tasks.taskidx;
    Todo.todo.update({}, {$unset : {urlstring : 1 }}) 
    Todo.todo.update({}, {$pull : {"tasks" : null}})
  }
  catch(error)
  {
    res.status(401).json({
      success:false,
      message:error.message
    }) 
  }
};
// exports.deleteTasks=async(req,res)=>{
// try
// {
    

//     // const checkTodoExists=await Todo.findById(id);
//     // if(!checkTodoExists)
//     //   throw new Error("no such todo exists");

//     // const todo=await Todo.findById(id);
//     // const tasksarray=todo.tasks;
//     // tasksarray.splice(idx,1);
//     // res.status(200).json({
//     //   success:true,
//     //   todo
//     // })
// }
