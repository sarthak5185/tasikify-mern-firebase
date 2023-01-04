import TaskList from "./components/TaskList";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskListsub from "./components/TaskListsub";
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';


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
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
  
          <Route path="/profile" element={<Profile />}/>
          <Route path="/profile/:todotitle/:todoid" element={<TaskListsub />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

