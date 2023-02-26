import React from 'react'
import { useNavigate } from 'react-router-dom'
const User = () => {
  const navigate= useNavigate()

  return (
    <div className={"c-flex-center"} style={{gap: 5}}>
        <img style={{cursor: "pointer"}} src="https://res.cloudinary.com/cockbook/image/upload/v1676558788/Screenshot_2023-02-16_214551_j4zirx.png" alt="" />
        <img onClick={()=> navigate("/login")} style={{cursor: "pointer"}} src="https://res.cloudinary.com/cockbook/image/upload/v1676558788/Screenshot_2023-02-16_214603_rbdxuo.png" alt="" />
    
    </div>
  )
}

export default User