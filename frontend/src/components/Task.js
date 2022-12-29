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
  useNavigate,
  useLocation,
} from "react-router-dom";
const Task= ({todo,index,deleteTodo,getSingleTodo}) => {
  const navigate = useNavigate();
  return (
    <div className="task">
      <p>
        <b>{index+1}. </b>
          {todo.title}
      </p>
      <div className="task-icons">
       <BiMessageAltAdd color="green" onClick={()=>navigate(`${todo.title}/${todo._id}`)}/>
       <FaEdit color="purple" onClick={() => getSingleTodo(todo)} />
       <FaRegTrashAlt color="red" onClick={()=>deleteTodo(todo._id)}/>
      </div>
    </div>
  )
}

export default Task
