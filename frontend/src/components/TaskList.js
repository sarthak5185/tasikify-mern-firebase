import TaskForm from "./TaskForm"
import Task from "./Task"
import { useContext, useEffect, useState} from "react"
import { toast } from "react-toastify"
import axios from "axios";
import { FaCentercode } from "react-icons/fa";
import loadingImg from "../assets/loader.gif"
import { UserId } from "./Profile";
const TaskList = () => {
  const userId = useContext(UserId);  // call userId
  const[isLoading,setisLoading]=useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [todo,setTodo]=useState([]);
  const [todoID, setTodoID] = useState("");
  const[formData,setFormData]=useState({
    title:"",
    tasks:[],
  })
  const {title}={formData}
  const handleInputChange=(e)=>{
    setFormData({...formData,title:e.target.value});
  };
  const getTasks=async()=>{
    setisLoading(true);
    try{
      const resp =await axios.get(`/getTodo/${userId}`);
      console.log(`inside get tasks:${resp}`);
      if(resp.data.todos.length>0)
      {
        setTodo(resp.data.todos);
      }
      setisLoading(false);
    }
    catch(error)
    {
        toast.error(error.message);
        console.log(error);
        setisLoading(false);
    }
  }
  useEffect(()=>{
    getTasks();
  },[userId]);
  const createTask=async(e)=>{
    e.preventDefault();
    if(title=== "")
    {
      return toast.error("Input Field can not be empty");
    }
    try{
      //send axios request
      await axios.post("/createTodo",{
          title:formData.title,
          userId:userId
      });
      setFormData({...formData,title:""});
      toast.success("Task added succesfully");
    }
    catch(error)
    {
       toast.error(error.message);
    }
    console.log(formData);
    getTasks();
  }
  const deleteTodo=async(id)=>{
    try{
      await axios.delete(`/deleteTodo/${id}`);
    }
    catch(error)
    {
      toast.error(error.message);
    }
    getTasks();
  }
  const getSingleTodo=async(todo)=>{
    setFormData({...formData,title:todo.title});
    setTodoID(todo._id);
    setIsEditing(true);
    console.log(`inside get singletodo id:${todo._id}`);
  }
  const updateTodo=async(e)=>{
    e.preventDefault();
    if(title==="")
    {
      return toast.error("Input field can not be empty");
    }
    try
    {
      console.log(`inside update todo id:${todoID} title:${formData.title}`);
      const resp = await axios.post(`/editTodo/${todoID}`, {
        title:formData.title
      });
      console.log(resp);
      setFormData({...formData,title:""});
      setIsEditing(false);
      getTasks();
    }
    catch(error)
    {
      toast.error(error.message);
    }
  }
  return (
    <div className="task-container">
     <h2>Task Manager</h2>
     <TaskForm title={title} 
     handleInputChange={handleInputChange} 
     createTask={createTask} 
     isEditing={isEditing}
     updateTodo={updateTodo}/>
     <hr/>
     {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
        {!isLoading && todo.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ):(
            <>
            {todo.map((todo, index) => {
            return (
              <Task
                key={todo._id}
                todo={todo}
                index={index}
                deleteTodo={deleteTodo}
                getSingleTodo={getSingleTodo}
              />
            );
          })}
            </>
          )}
    </div>
  );
};

export default TaskList;
