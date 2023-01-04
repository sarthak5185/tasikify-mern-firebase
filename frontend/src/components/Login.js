import React, {useState} from 'react'
import {account} from '../appwrite/appwriteConfig'
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify"

function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            await account.createEmailSession(user.email, user.password);
            console.log(user);
            navigate("/profile")
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        console.log(user.id);
    }

  return (
    <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => {
              setUser({
                  ...user,
                  email: e.target.value
              })
          }}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => {
              setUser({
                  ...user,
                  password: e.target.value
              })
          }}
          />
        </div>
      
        <div className="d-grid">
          <button type="submit" className="btn btn-light" onClick={loginUser}>
            Submit
          </button>
          <a href="/signup" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Signup</a>
        </div>
      </form>
      
  )
}

export default Login