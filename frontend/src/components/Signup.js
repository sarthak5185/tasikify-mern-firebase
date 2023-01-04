import React, {useState} from 'react'
import {account} from '../appwrite/appwriteConfig'
import {useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { toast } from "react-toastify"
function Signup() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    //Signup 
    const signupUser = async (e) => {
        e.preventDefault()

        const promise = account.create(
            uuidv4(),
            user.email,
            user.password,
            user.name
        );

        promise.then(
            function(response){
                console.log(response);
                navigate("/profile") //success
            },
            function(error) {
                console.log(error); // Failure
                toast.error(error.message);
            }
        )


    }

  return (
    <form>
    <h3>Sign Up</h3>
    <div className="mb-3">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        placeholder="Name"
        onChange={(e) => {
          setUser({
              ...user,
              name: e.target.value
          })
      }}
      />
    </div>
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
      <button type="submit" className="btn btn-primary " onClick={signupUser}>
        Sign Up
      </button>
    </div>
    <p className="forgot-password text-right">
      Already registered <a href="/">sign in?</a>
    </p>
  </form>
  )
}

export default Signup;

