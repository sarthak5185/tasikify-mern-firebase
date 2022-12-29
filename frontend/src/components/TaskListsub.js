import React from 'react';

import TaskFormsub from './TaskFormsub';
import Tasksub from './Tasksub';
import { toast } from "react-toastify";
import { useEffect,useState } from 'react';
import axios from "axios";
import loadingImg from "../assets/loader.gif";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

function TaskListsub() {
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const navigate = useNavigate();
  const [tasks,setTasks]=useState([]);
  const {todotitle,todoid} = useParams();
  const [completedTasks, setCompletedTasks] = useState([]);
  const[formData,setFormData]=useState({
    tasktitle:"",
    taskCompleted:false
  })
  const{tasktitle}=formData;
  const handleInputChange=(e)=>{
    setFormData({...formData,tasktitle:e.target.value});
  };
  const getTasks=async()=>{
    try
    {
      const url=`http://localhost:4000/getTasks/${todoid}`;
      const resp =await axios.get(url);
      console.log(resp);
      if(resp.data.tasks.length>0)
      {
        setTasks(resp.data.tasks);
      }
    }
    catch(error)
    {
      toast.error(error.message);
      console.log(error);
    }
  }
  useEffect(()=>{
    getTasks();
  },[]);
  const createTask=async(e)=>{
      e.preventDefault();
      if(tasktitle==="")
      {
        return toast.error("Input field can not be empty");
      }
      try
      {
        console.log(formData.tasktitle);
        console.log(todoid);
        const response=await axios.post(`http://localhost:4000/createTask/${todoid}`,{
          task:formData.tasktitle
        });
        console.log(response);
        setFormData({...formData,tasktitle:""});
        toast.success("Task added succesfully");
      }
      catch(error)
      {
        toast.error(error.message);
      }
      getTasks();
  };
  const deletetask=async(taskid,todoid)=>{
    const id=todoid+'_'+taskid;
    try
    {
      const response=await axios.delete(`http://localhost:4000/deleteTasks/${id}`);
      console.log(response);
    }
    catch(error)
    {
      toast.error(error.message);
    }
    getTasks();
  };
  useEffect(() => {
    const cTask = tasks.filter((tasks) => {
      return tasks.taskCompleted=== true;
    });
    setCompletedTasks(cTask);
  }, [tasks]);
  const getSingleTask=async(todoid,index,tasks,taskid)=>{
    setFormData({...formData,tasktitle:tasks.task});
    setTaskID(tasks._id);
    setIsEditing(true);
    console.log(`inside get singletask id:${tasks._id}`);
  }
  const updateTask=async(e)=>{
    e.preventDefault();
    if(tasktitle==="")
    {
      return toast.error("Input field can not be empty");
    }
    try
    {
      console.log(`inside update task id:${taskID} title:${formData.tasktitle}`);
      const id=todoid+"_"+taskID;
      const resp = await axios.post(`http://localhost:4000/editTasks/${id}`, {
        task:formData.tasktitle
      });
      console.log(resp);
      setFormData({...formData,tasktitle:""});
      setIsEditing(false);
      getTasks();
    }
    catch(error)
    {
      toast.error(error.message);
    }
  }
  const setToComplete = async (tasks,taskid,todoid) => {
    try {
      const id=todoid+"_"+tasks._id;
      console.log(id);
      const resp = await axios.post(`http://localhost:4000/completedTask/${id}`);
      console.log(`Inside Completed ${resp}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="task-container">
       <h1>{todotitle}</h1>
      <TaskFormsub tasktitle={tasktitle} createTask={createTask} handleInputChange={handleInputChange}
      isEditing={isEditing}
      updateTask={updateTask}/>
         {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks:</b> {tasks.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTasks.length}
          </p>
        </div>
      )}

      <hr />
      {tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ):(
            <>
            {tasks.map((tasks, index) => {
            return (
              <Tasksub
                todoid={todoid}
                tasks={tasks}
                taskid={tasks._id}
                index={index}
                deletetask={deletetask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
            <button type="button" class="--btn-primary" onClick={() => navigate(-1)}>Go back</button>
            </>
          )}
    </div>
  )
}
export default TaskListsub;

