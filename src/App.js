// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Signup from './Component/Signup/Signup';
import { createContext, useEffect, useState } from 'react';
import authUser from './api/auth';

export const AppContext= createContext()
function App() {
  const [auth, setAuth]= useState()
  const [user, setUser]= useState()
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
  }, [])
  return (
    <AppContext.Provider value={{auth, user}}>
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
