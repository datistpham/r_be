import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import { Box } from '@mui/system';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import RoomServiceIcon from '@mui/icons-material/RoomService';

const Navigation = () => {

  const navigate= useNavigate()

  return (
    <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
       
        <NavLink to={"/"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
          <div onClick={()=> navigate("/")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
            <ComponentNavigation title={"Trang chủ"} icon={<HomeIcon />} />
          </div>
        </NavLink>
        {/* <div onClick={()=> navigate("/blog")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
          <ComponentNavigation title={"Bài viết"} icon={<BookIcon />} />
        </div> */}
        <NavLink to={"/order"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
          <div onClick={()=> navigate("/order")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
            <ComponentNavigation title={"Đặt bàn"} icon={<BorderAllIcon />} />
          </div>
        </NavLink>
        <NavLink to={"/menu"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
          <div onClick={()=> navigate("/menu")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
            <ComponentNavigation title={"Thực đơn"} icon={<RestaurantMenuIcon />} />
          </div>
        </NavLink>
        <NavLink to={"/banquet-hall"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
          <div onClick={()=> navigate("/banquet-hall")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
            <ComponentNavigation title={"Đặt sảnh"} icon={<RoomServiceIcon />} />
          </div>
        </NavLink>
        <NavLink to={"/about"} style={{textDecoration: "none", color: "unset"}} className={({isActive})=> isActive ? "active-link" : "no-active-link"}>
          <div onClick={()=> navigate("/about")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
            <ComponentNavigation title={"Liên hệ đặt tiệc"} />
          </div>
        </NavLink>
    </div>
  )
}

const ComponentNavigation= (props)=> {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 1}}>
      {props?.icon}
      <div>{props?.title}</div>
    </Box>
  )
}

export default Navigation