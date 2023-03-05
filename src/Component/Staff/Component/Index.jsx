import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../Admin/pages/home/Home'
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
                {/* <Route path="/users" element={<UserList />}>
                </Route>
                <Route path="/user/:userId" element={<User />}>
                </Route>
                <Route path="/newUser" element={<NewUser />}>
                </Route>
                <Route path="/products" element={<ProductList />}>
                </Route>
                <Route path="/product/:productId" element={<Product />}>
                </Route>
                <Route path="/newproduct" element={<NewProduct />}>
                </Route> */}
            </Routes>
      </div>
    </>
  )
}

export default Index