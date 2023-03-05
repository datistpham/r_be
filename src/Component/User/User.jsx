import { Menu, MenuItem } from '@mui/material'
import Cookies from 'js-cookie'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import InfoUser from './InfoUser'

const User = () => {
  const navigate= useNavigate()
  // eslint-disable-next-line
  const {auth, user}= useContext(AppContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };
  const Logout= ()=> {
    Cookies.remove("uid")
    window.location.reload()
  }

  return (
    <div className={"c-flex-center"} style={{gap: 5}}>
        <img onClick={()=> navigate("/cart")} style={{cursor: "pointer"}} src="https://res.cloudinary.com/cockbook/image/upload/v1676558788/Screenshot_2023-02-16_214551_j4zirx.png" alt="" />
        {
          auth=== false && 
          <img onClick={()=> navigate("/login")} style={{cursor: "pointer"}} src="https://res.cloudinary.com/cockbook/image/upload/v1676558788/Screenshot_2023-02-16_214603_rbdxuo.png" alt="" />
        }
        {
          auth=== true && 
          <>
            <img onClick={handleClick} style={{cursor: "pointer"}} src="https://res.cloudinary.com/cockbook/image/upload/v1676558788/Screenshot_2023-02-16_214603_rbdxuo.png" alt="" />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
          <MenuItem onClick={()=> {
            }}><InfoUser handleClose={handleClose} /></MenuItem>
            <MenuItem onClick={()=> {
              handleClose()
              Logout()
            }}>Đăng xuất</MenuItem>
          </Menu>
          </>
        }
    </div>
  )
}

export default User