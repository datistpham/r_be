import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import authUser from '../../api/auth'
import Login from './Component/Login'
import IndexAdmin from './Index'

const Admin = () => {
    // eslint-disable-next-line
    const [admin, setAdmin]= useState()
    const [auth, setAuth]= useState(false)

    useEffect(()=> {
        (async ()=> {
            const result= await authUser()
            if(result?.isAdmin=== true) {
                setAuth(()=> true)
            }
            else {
                setAdmin(()=> false)
            }
            return setAdmin(result)
        })()
    }, [])

    return (
        <Routes>
            {
                auth=== true && 
                <>
                    <Route path={"/*"} element={<IndexAdmin />}  />
                    <Route path={"/login"} element={<Navigate to={"/admin"} />} />
                </>
            }
            {
                auth=== false && 
                <>
                    <Route path={"/*"} element={<Navigate to={"/admin/login"} replace={true} />} />
                    <Route path={"/login"} element={<Login />} />
                </>
            }
        </Routes>
  )
}

export default Admin