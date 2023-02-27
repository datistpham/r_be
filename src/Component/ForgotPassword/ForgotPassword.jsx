import { Button } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import forgot_password from '../../api/forgot_password';
import OtpInput from 'react-otp-input';
import recover_password from '../../api/recover_password';
import swal from 'sweetalert';
import reset_password from '../../api/reset_password';

const ForgotPassword = (props) => {
  const {setOpen }= props
  const [email, setEmail]= useState("")
  const [open2, setOpen2]= useState(false)
  const [verifyCode, setVerifyCode]= useState(0)
  const [password, setPassword]= useState("")
  const [confirmPassword, setConfirmPassword]= useState("")

  return (
    <div className="container">
        {
        open2=== false &&
        <section className="wrapper">
            <div className="heading">
            <h1 className="text text-large"><Button onClick={()=> setOpen(false)} style={{aspectRatio: 1 / 1, borderRadius: "50%"}}><ArrowBackIcon /></Button>Forgot password</h1>
            <p className="text text-normal">Recover your password <span></span>
            </p>
            </div>
            <div name="signin" className="form">
            <div className="input-control">
                <label htmlFor="email" className="input-label" hidden>Email Address</label>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" name="email" id="email" className="input-field" placeholder="Email Address" />
            </div>
            <div className={"c-flex-center"}>
                <Button variant={"contained"} onClick={async ()=> {
                    const result= await forgot_password(email)
                    if(result?.verify=== "pending") {
                        setOpen2(()=> true)
                    }
                    else {
                        swal("Thông báo", "Email không tồn tại trong hệ thống", "error")
                    }
                }}>Send</Button>
            </div>
            </div>
        </section>
        }
        {
            open2=== true && 
            <>
            <section className="wrapper">
                <div className="heading">

                    <div>We've just send your email a code inclues 6 digit, Please check your email and type to below form to complete recover password process</div>
                        <OtpInput containerStyle={"asw"} inputStyle={"lll"} value={verifyCode} onChange={setVerifyCode} numInputs={6} separator={<span>&nbsp;&nbsp;</span>} />
                        <br />
                        <div className={"c-flex-center"}>
                            <Button onClick={async ()=> {
                                const result= await recover_password(email, verifyCode)
                                if(result?.recover=== false ) {
                                    swal("","Verify code is invalid. Please try again", "error")
                                }
                                else if(result?.recover=== true) {
                                    setOpen2(()=> undefined)
                                }
                                else {
                                    swal("","Error")
                                }
                            }} variant={"contained"}>Verify</Button>
                    </div>
                </div>
            </section>
            </>
        }
        {
            open2=== undefined && <>
            <section className="wrapper">
                <div className="heading">
                    <h1 className="text text-large">Reset your password</h1>
                    <form name="signin" className="form">
                        <div className="input-control">
                            <label htmlFor="password" className="input-label" hidden>New password</label>
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" name="Password" id="Password" className="input-field" placeholder="New password" />
                        </div>
                        <div className="input-control">
                            <label htmlFor="Password" className="input-label" hidden>Confirm password</label>
                            <input value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} type="password" name="Password" id="Password" className="input-field" placeholder="Confirm password" />
                        </div>
                    </form>
                    <div className={"c-flex-center"}>
                        <Button variant={"contained"} onClick={async ()=> {
                            const result= await reset_password(email, password)
                            if(result?.reset=== true ) {
                                swal("Thông báo", "Mật khẩu mới đã được tạo", "success")
                                .then(()=> setOpen(()=> false))
                            }
                            else {
                                swal("Error")
                            }
                        }}>Save</Button>
                    </div>
                </div>
            </section>
            </>
        }
    </div>
  )
}

export default ForgotPassword