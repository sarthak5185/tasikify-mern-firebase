import React from 'react'
import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { BiMessageAltAdd } from "react-icons/bi";
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
} from "react-router-dom";
function Tasksub({todoid,index,tasks,taskid,deletetask,getSingleTask,setToComplete}) {

  return (
    <div className={tasks.taskCompleted? "task completed" : "task"}>
      <p>
        <b>{index+1}.  </b>
        {tasks.task}
      </p>
      <div className="task-icons">
      <FaCheckDouble color="green" onClick={() => setToComplete(tasks,taskid,todoid)} />
      <FaEdit color="purple" onClick={() => getSingleTask(todoid,taskid,tasks,index)} />
       <FaRegTrashAlt color="red" onClick={()=>{
        deletetask(taskid,todoid);
       }}/>
      </div>
    </div>
  )
}

export default Tasksub
