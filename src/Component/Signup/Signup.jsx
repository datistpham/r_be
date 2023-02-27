import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../Login/Login.scss"
import swal from "sweetalert"
import signup from '../../api/signup'
import OtpInput from 'react-otp-input';
import { Button } from '@mui/material'
import verify_email from '../../api/verify_email'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Signup = () => {
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const [confirmPassword, setConfirmPassword]= useState("")
  const [firstName, setFirstName]= useState("")
  const [lastName, setLastName]= useState("")
  const [verifyCode, setVerifyCode]= useState(0)
  const navigate= useNavigate()
  const [open, setOpen]= useState(false)
  const validatePasswordRegex= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  const validatePassword= (str)=> {
    return validatePasswordRegex.test(str)
  }
  return (
    <div>
        <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 1000, width: "100%", padding: 10, marginTop: 50}}>
            <main className="main">
                <div className="container">
                {open=== false &&  <section className="wrapper">
                    <div className="heading">
                    <h1 className="text text-large">Sign Up</h1>
                    <p className="text text-normal">Old user? <span><Link to={"/login"} className="text text-links">Login account</Link></span>
                    </p>
                    </div>
                    <form name="signin" className="form">
                        <div className="input-control">
                            <label htmlFor="email" className="input-label" hidden>Email Address</label>
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" name="email" id="email" className="input-field" placeholder="Email Address" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>Password</label>
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" name="Password" id="Password" className="input-field" placeholder="Password" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="Password" className="input-label" hidden>Confirm password</label>
                            <input value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} type="password" name="Password" id="Password" className="input-field" placeholder="Confirm password" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="First name" className="input-label" hidden>First name</label>
                            <input value={firstName} onChange={(e)=> setFirstName(e.target.value)} type="text" name="surname" id="surname" className="input-field" placeholder="Firstname" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="Lastname" className="input-label" hidden>Lastname</label>
                            <input value={lastName} onChange={(e)=> setLastName(e.target.value)} type="text" name="lastname" id="lastname" className="input-field" placeholder="Lastname" />
                        </div>
                        <div className="input-control">
                            <div></div>
                            <input onClick={async (e)=> {
                                e.preventDefault()
                                if(validatePassword(password) === false ) {
                                    swal("Thông báo", "Mật khẩu phải có ít nhất 8 ký tự gồm chữ hoa, chữ thường và chữ số")
                                }
                                else {

                                    const result= await signup(email, password, firstName, lastName)
                                    if(result?.verify=== "pending") {
                                        setOpen(()=> true)
                                    }
                                    else if(result?.exist=== true) {
                                        swal("","Email is exist, please choose another email")
                                    }
                                    else {
                                        swal("", "Error")
                                    }
                                }
                            }} type="submit" name="submit" value={"Sign up"} className="input-submit" defaultValue="Sign Up" />
                        </div>
                    </form>
                    <div className="striped">
                    <span className="striped-line" />
                    <span className="striped-text">Or</span>
                    <span className="striped-line" />
                    </div>
                    <div className="method">
                    <div className="method-control">
                        <a href="#" className="method-action">
                        <i className="ion ion-logo-google" />
                        <span>Sign up with Google</span>
                        </a>
                    </div>
                    <div className="method-control">
                        <a href="#" className="method-action">
                        <i className="ion ion-logo-facebook" />
                        <span>Sign up with Facebook</span>
                        </a>
                    </div>
                    <div className="method-control">
                        <a href="#" className="method-action">
                        <i className="ion ion-logo-apple" />
                        <span>Sign up with Apple</span>
                        </a>
                    </div>
                    </div>
                </section>}
                {
                    open=== true && <section className="wrapper">
                    <div className="heading">
                            <h1 className="text text-large"><Button onClick={()=> setOpen(false)} style={{aspectRatio: 1 / 1, borderRadius: "50%"}}><ArrowBackIcon /></Button>Verify email</h1>

                            <div>We've just send your email a code inclues 6 digit, Please check your email and type to below form to complete signup process</div>
                            <OtpInput containerStyle={"asw"} inputStyle={"lll"} value={verifyCode} onChange={setVerifyCode} numInputs={6} separator={<span>&nbsp;&nbsp;</span>} />
                            <br />
                            <div className={"c-flex-center"}>
                                <Button onClick={async ()=> {
                                    const result= await verify_email(email,password, firstName, lastName, verifyCode)
                                    if(result?.signup=== false ) {
                                        swal("","Verify code is invalid. Please try again")
                                    }
                                    else if(result?.signup=== true) {
                                        swal("", "Signup was successfully", "success")
                                        .then(()=> navigate(result.redirect))
                                    }
                                    else {
                                        swal("","Error")
                                    }
                                }} variant={"contained"}>Verify</Button>
                            </div>
                        </div>
                    </section>
                }
                </div>
            </main>
        </div>
        <div className={"c-flex-center"} style={{position: "fixed", top: 0, left: 0, zIndex: 999, width: "100%", height: "100%", backgroundImage: "url(https://appetizer-client.vercel.app/static/media/bg-login.59c329f0.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
            
        </div>
    </div>
  )
}

export default Signup