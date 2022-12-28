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
  const navigate = useNavigate();
  const [tasks,setTasks]=useState([]);
  const {todotitle,todoid} = useParams();
  const[formData,setFormData]=useState({
    tasktitle:"",
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
        const url=`http://localhost:4000/createTask/${todoid}`;
        const response=await axios.post(url,formData);
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
  const deletetask=async(index)=>{
    console.log(index);
  }
  return (
    <div className="task-container">
       <h1>{todotitle}</h1>
      <TaskFormsub tasktitle={tasktitle} createTask={createTask} handleInputChange={handleInputChange}/>
      {tasks.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ):(
            <>
            {tasks.map((tasks, index) => {
            return (
              <Tasksub
                key={todoid}
                tasks={tasks}
                index={index}
                deletetask={deletetask}
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

