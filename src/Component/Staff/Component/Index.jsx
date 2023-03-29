import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../Admin/pages/home/Home'
import Info from './Infomation/Info'
import Sidebar from './Sidebar/Sidebar'
import Topbar from './TopBar/TopBar'

const Index = () => {
  return (
    <>
      <Topbar />
      <div className="container-admin">
          <Sidebar />
          <Routes>
                <Route path="/" element={<Home />}>
                </Route>
                <Route path={"/info"} element={<Info />} />
            </Routes>
      </div>
    </>
  )
}

export default Index