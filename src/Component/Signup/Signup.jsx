import React from 'react'
import { Link } from 'react-router-dom'
import "../Login/Login.scss"

const Signup = () => {
  return (
    <div>
        <div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 1000, width: "100%", padding: 10, marginTop: 50}}>
            <main className="main">
                <div className="container">
                <section className="wrapper">
                    <div className="heading">
                    <h1 className="text text-large">Sign Up</h1>
                    <p className="text text-normal">Old user? <span><Link to={"/login"} className="text text-links">Login account</Link></span>
                    </p>
                    </div>
                    <form name="signin" className="form">
                    <div className="input-control">
                        <label htmlFor="email" className="input-label" hidden>Email Address</label>
                        <input type="email" name="email" id="email" className="input-field" placeholder="Email Address" />
                    </div>
                    <div className="input-control">
                        <label htmlFor="email" className="input-label" hidden>Password</label>
                        <input type="password" name="Password" id="Password" className="input-field" placeholder="Password" />
                    </div>
                    <div className="input-control">
                        <label htmlFor="Password" className="input-label" hidden>Confirm password</label>
                        <input type="password" name="Password" id="Password" className="input-field" placeholder="Confirm password" />
                    </div>
                    <div className="input-control">
                        <label htmlFor="Surname" className="input-label" hidden>Surname</label>
                        <input type="text" name="surname" id="surname" className="input-field" placeholder="Surname" />
                    </div>
                    <div className="input-control">
                        <label htmlFor="Lastname" className="input-label" hidden>Lastname</label>
                        <input type="text" name="lastname" id="lastname" className="input-field" placeholder="Lastname" />
                    </div>
                    <div className="input-control">
                        <a href="#" className="text text-links"></a>
                        <input type="submit" name="submit" value={"Login"} className="input-submit" defaultValue="Sign Up" disabled />
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
                </section>
                </div>
            </main>
        </div>
        <div className={"c-flex-center"} style={{position: "fixed", top: 0, left: 0, zIndex: 999, width: "100%", height: "100%", backgroundImage: "url(https://appetizer-client.vercel.app/static/media/bg-login.59c329f0.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
            
        </div>
    </div>
  )
}

export default Signup