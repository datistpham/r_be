import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import login from '../../api/login'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import "./Login.scss"

const Login = () => {
  const navigate= useNavigate()
  const [email, setEmail] =useState("")
  const [password, setPassword]= useState("")
  const [open, setOpen]= useState(false)

  return (
    <div>
        <div className={"c-flex-center"} style={{position: "fixed", top: 0, left: 0, zIndex: 999, width: "100%", height: "100%", backgroundImage: "url(https://appetizer-client.vercel.app/static/media/bg-login.59c329f0.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
            <main className="main">
                {
                    open=== false && 
                    <div className="container">
                        <section className="wrapper">
                            <div className="heading">
                            <h1 className="text text-large">Sign In</h1>
                            <p className="text text-normal">New user? <span><Link to={"/signup"} className="text text-links">Create an account</Link></span>
                            </p>
                            </div>
                            <div name="signin" className="form">
                            <div className="input-control">
                                <label htmlFor="email" className="input-label" hidden>Email Address</label>
                                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" name="email" id="email" className="input-field" placeholder="Email Address" />
                            </div>
                            <div className="input-control">
                                <label htmlFor="password" className="input-label" hidden>Password</label>
                                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" name="password" id="password" className="input-field" placeholder="Password" />
                            </div>
                            <div className="input-control">
                                <a href onClick={()=> setOpen(()=> true)} className="text text-links">Forgot Password</a>
                                <input onClick={async (e)=> {
                                    e.preventDefault()
                                    const result= await login(email, password)
                                    if(result?.login=== false ) {
                                        swal("Thông báo", "Đăng nhập thất bại, email hoặc mật khẩu không chính xác", "error")
                                    }
                                    else if(result?.login=== true) {
                                        swal("Thông báo", "Đăng nhập thành công", "success").then(()=> Cookies.set("uid", result.id_user)).then(()=> navigate("/")).then(()=> window.location.reload())

                                    }
                                    else {
                                        swal("Thông báo", "Error")

                                    }
                                }} type="submit" name="submit" value={"Login"} className="input-submit" defaultValue="Sign In" />
                            </div>
                            </div>
                            <div className="striped">
                            <span className="striped-line" />
                            <span className="striped-text">Or</span>
                            <span className="striped-line" />
                            </div>
                            <div className="method">
                            <div className="method-control">
                                <a href="#" className="method-action">
                                <i className="ion ion-logo-google" />
                                <span>Sign in with Google</span>
                                </a>
                            </div>
                            <div className="method-control">
                                <a href="#" className="method-action">
                                <i className="ion ion-logo-facebook" />
                                <span>Sign in with Facebook</span>
                                </a>
                            </div>
                            <div className="method-control">
                                <a href="#" className="method-action">
                                <i className="ion ion-logo-apple" />
                                <span>Sign in with Apple</span>
                                </a>
                            </div>
                            </div>
                        </section>
                    </div>
                }
                {
                    open=== true && <ForgotPassword setOpen={setOpen} />
                }
            </main>
        </div>
    </div>
  )
}

export default Login