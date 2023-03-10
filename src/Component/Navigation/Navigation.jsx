import React from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import { Box } from '@mui/system';
import BorderAllIcon from '@mui/icons-material/BorderAll';

const Navigation = () => {

  const navigate= useNavigate()

  return (
    <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
        <div onClick={()=> navigate("/")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
          <ComponentNavigation title={"Trang chủ"} icon={<HomeIcon />} />
        </div>
        <div onClick={()=> navigate("/blog")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
          <ComponentNavigation title={"Bài viết"} icon={<BookIcon />} />
        </div>
        <div onClick={()=> navigate("/order")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
          <ComponentNavigation title={"Đặt bàn"} icon={<BorderAllIcon />} />
        </div>
        <div onClick={()=> navigate("/menu")} style={{padding: 10, fontSize: 20, cursor: "pointer"}}>
          <ComponentNavigation title={"Thực đơn"} icon={<RestaurantMenuIcon />} />
        </div>
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