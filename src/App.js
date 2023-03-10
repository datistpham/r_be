// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Signup from './Component/Signup/Signup';
import { createContext, useEffect, useState } from 'react';
import authUser from './api/auth';
import Cart from './Component/Cart/Cart';
import Admin from './Component/Admin/Admin';
import Staff from './Component/Staff/Staff';
import Order from './Component/Order/Order';
import Menu from './Component/Menu/Menu';

export const AppContext= createContext()
function App() {
  const [auth, setAuth]= useState()
  const [user, setUser]= useState()
  const [change, setChange]= useState(false)
  useEffect(()=> {
    (async ()=> {
      const result= await authUser()
      if(result.auth=== true) {
        setAuth(()=> true)
        setUser(()=> result)
      }
      else {
        setAuth(()=> false)
      }
    })()
  }, [change])
  return (
    <AppContext.Provider value={{auth, user, setChange}}>
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/admin/*"} element={<Admin />} />
          <Route path={"/staff/*"} element={<Staff />} />
          <Route path={"/order/*"} element={<Order />} /> 
          <Route path={"/menu/*"} element={<Menu />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
