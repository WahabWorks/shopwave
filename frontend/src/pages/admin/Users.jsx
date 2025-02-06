import axios from "axios";
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState({});

  const getAllUsers = ()=>{
    axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/all-users`,
        {
          withCredentials:true , 
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response)=>{
          console.log(response);
          setUsers(response?.data)
        })
        .catch((error)=>{
          console.log(error);
                 
        })
  }
  useEffect(()=>{
    getAllUsers();
  })

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center"></div>
        {JSON.stringify(users,undefined ,4)}
      </div>
    </>
  );
}
export default Users;
