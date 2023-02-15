
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";

import "./login.scss";


const Login = () => {
    const [thisState,setThisState] = useState(false);
    //Set hooks for login:
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("")
    //Set hooks for sign up:
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword,setSignUpPassword] = useState("")
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

    //Login function
    const signIn =() =>{
        console.log('email:',loginEmail)
        console.log('password:', loginPassword)
    }
    //Signup function
    const signUp =() =>{
        console.log('email:',signUpEmail)
        console.log('password:', signUpPassword)
        console.log('confirm password:', signUpConfirmPassword)
    }
    return (
    <Box m="20px" className="Login template">
      <div className="login">
                <div className={`login__colored-container ${thisState ? 'login__colored-container--left' : 'login__colored-container--right'}`}></div>
                <div className={`login__welcome-back ${thisState ? 'login__welcome-back--active' : 'login__welcome-back--inactive'}`}>
                    <div className="login__welcome-back__logo-container">
                        App Name
                    </div>
                    <div className="login__welcome-back__main-container">
                        <div className="login__welcome-back__main-container__text-container">
                            <span className="login__welcome-back__main-container__text-container--title">
                                Welcome Back!
                            </span>
                            <span className="login__welcome-back__main-container__text-container--secondary">
                                To keep sharing your work with us, please log in.
                            </span>
                        </div>
                        <div onClick={() => {
                            setThisState(false);
                        }} className="login__welcome-back__main-container__button-container">
                            Sign In
                        </div>
                    </div>
                </div>
                <div className={`login__create-container ${thisState ? 'login__create-container--active' : 'login__create-container--inactive'}`}>
                    Create Account
                    
                    <span className="login__create-container--info-text">or use email for your registration</span>
                    <div className="login__create-container__form-container">
                        <form className="login__create-container__form-container__form" onSubmit={(e) => {
                            e.preventDefault();
                            signUp();
                        }}>
                            <input
                                className="login__create-container__form-container__form--name"
                                type="text"
                                placeholder="Name"
                           
                                onChange = {(event)=> setSignUpEmail(event.target.value)}
                                /*value={this.state.signUpForm.name}
                                onChange={(value) => this.setState({
                                    signUpForm: {
                                        name: value.target.value,
                                        email: this.state.signUpForm.email,
                                        password: this.state.signUpForm.password
                                    }
                                })}*/
                                required />
                           
                            <input
                                className="login__create-container__form-container__form--password"
                                type="password"
                                placeholder="Password"
                                /*value={this.state.signUpForm.password}
                                onChange={(value) => this.setState({
                                    signUpForm: {
                                        password: value.target.value,
                                        name: this.state.signUpForm.name,
                                        email: this.state.signUpForm.email
                                    }
                                })}*/
                                onChange = {(event)=> setSignUpPassword(event.target.value)}
                                required />
                            <input
                                className="login__create-container__form-container__form--password"
                                type="password"
                                placeholder="Confirm Password"
                                /*value={this.state.signUpForm.password}
                                onChange={(value) => this.setState({
                                    signUpForm: {
                                        password: value.target.value,
                                        name: this.state.signUpForm.name,
                                        email: this.state.signUpForm.email
                                    }
                                })}*/
                                onChange = {(event)=> setSignUpConfirmPassword(event.target.value)}
                                required />
                            <button
                                className="login__create-container__form-container__form--submit">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
                <div className={`login__login-container ${!thisState? 'login__login-container--active' : 'login__login-container--inactive'}`}>
                    <div className="login__login-container__logo-container">
                        Appname
                    </div>
                    <div className="login__login-container__main-container">
                
                        <span className="login__login-container__main-container--info-text">or use email for your login</span>
                        <div className="login__login-container__main-container__form-container">
                            <form className="login__login-container__main-container__form-container__form" onSubmit={(e) => {
                                e.preventDefault();
                                signIn();
                            }}>
                                <input
                                    className="login__login-container__main-container__form-container__form--email"
                                    type="email"
                                    placeholder="Email"
                                    onChange = {(event)=> setLoginEmail(event.target.value)}
                                    /*value={this.state.signInForm.email}
                                    onChange={(value) => this.setState({
                                        signInForm: {
                                            email: value.target.value,
                                            password: this.state.signInForm.password
                                        }
                                    })}*/
                                    required />
                                <input
                                    className="login__login-container__main-container__form-container__form--password"
                                    type="password"
                                    placeholder="Password"
                                    /*value={this.state.signInForm.password}
                                    onChange={(value) => this.setState({
                                        signInForm: {
                                            password: value.target.value,
                                            email: this.state.signInForm.email
                                        }
                                    })}*/
                                    
                                    onChange = {(event)=> setLoginPassword(event.target.value)}
                                    required />
                                <button
                                    className="login__login-container__main-container__form-container__form--submit">
                                    Sign In
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={`login__hello-container ${!thisState ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
                    <div className="login__welcome-back__main-container__text-container">
                        <span className="login__welcome-back__main-container__text-container--title">
                            Hello, stranger!
                            </span>
                        <span className="login__welcome-back__main-container__text-container--secondary">
                            Enter your personal details and start your own portfolio!
                        </span>
                    </div>
                    <div onClick={() => {
                        setThisState(true);
                    }} className="login__welcome-back__main-container__button-container">
                        Sign Up
                    </div>
                </div>
            </div>

    </Box>



  );
};
export default Login;