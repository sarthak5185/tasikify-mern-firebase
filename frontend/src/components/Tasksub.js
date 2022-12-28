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
function Tasksub({tasks,index,deletetask}) {

  return (
      <div className="task">
      <p>
        <b>{index+1}.  </b>
        {tasks}
      </p>
      <div className="task-icons">
       <FaEdit color="purple" onClick={() =>{
       }} />
       <FaRegTrashAlt color="red" onClick={()=>{
        deletetask(index);
       }}/>
      </div>
    </div>
  )
}

export default Tasksub
