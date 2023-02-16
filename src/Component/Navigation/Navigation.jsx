import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {

  const navigate= useNavigate()

  return (
    <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
        <div onClick={()=> navigate("/")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>Trang chủ</div>
        <div onClick={()=> navigate("/blog")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>Bài viết</div>
        <div onClick={()=> navigate("/order")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>Đặt bàn</div>
    </div>
  )
}

export default Navigation