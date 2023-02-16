import React from 'react'
import { Link } from 'react-router-dom'
import "./Login.scss"

const Login = () => {
  return (
    <div>
        <div className={"c-flex-center"} style={{position: "fixed", top: 0, left: 0, zIndex: 999, width: "100%", height: "100%", backgroundImage: "url(https://appetizer-client.vercel.app/static/media/bg-login.59c329f0.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
            <main className="main">
                <div className="container">
                <section className="wrapper">
                    <div className="heading">
                    <h1 className="text text-large">Sign In</h1>
                    <p className="text text-normal">New user? <span><Link to={"/signup"} className="text text-links">Create an account</Link></span>
                    </p>
                    </div>
                    <form name="signin" className="form">
                    <div className="input-control">
                        <label htmlFor="email" className="input-label" hidden>Email Address</label>
                        <input type="email" name="email" id="email" className="input-field" placeholder="Email Address" />
                    </div>
                    <div className="input-control">
                        <label htmlFor="password" className="input-label" hidden>Password</label>
                        <input type="password" name="password" id="password" className="input-field" placeholder="Password" />
                    </div>
                    <div className="input-control">
                        <a href="#" className="text text-links">Forgot Password</a>
                        <input type="submit" name="submit" value={"Login"} className="input-submit" defaultValue="Sign In" disabled />
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
            </main>
        </div>
    </div>
  )
}

export default Login