import React, {createContext,useState, useEffect} from 'react'
import {account} from '../appwrite/appwriteConfig'
import {useNavigate, Link} from 'react-router-dom'
import { toast } from "react-toastify"
import TaskList from './TaskList'
const UserId=createContext();
 
 
function Profile() {
   const navigate = useNavigate()
 
   const [userDetails, setUserDetails] = useState()
 
   useEffect(() => {
     const getData = account.get()
     getData.then(
       function(response){
           setUserDetails(response)
           //console.log(userDetails);
       },
       function(error){
           console.log(error);
           toast.error(error.message);
       }
     )
   }, [])
 
   const handleLogout = async () => {
       try {
           await account.deleteSession("current")
           navigate("/")
       } catch (error) {
           console.log(error);
           toast.error(error.message);
       }
   }
  
 
 return (
   <>
     {userDetails ? (
       <>
         <div >
           <div>
             <h2 class="text-light">Hello {userDetails.name}</h2>
           </div>
           <div>
           </div>
         </div>
         {/* TODO FORM */}
         <UserId.Provider value={userDetails && userDetails.$id}>
            <TaskList />
        </UserId.Provider>
        <button type="button" class="btn btn-success" onClick={handleLogout}>Logout</button>
       </>
     ) : (
       <p className="mt-4">
         Please Login To see Profile{" "}
         <Link to="/">
           <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
             Login
           </span>
         </Link>
       </p>
     )}
   </>
 )
}
 
export default Profile;
export {UserId};

