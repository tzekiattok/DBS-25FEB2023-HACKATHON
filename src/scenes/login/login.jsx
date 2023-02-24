
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { reactLocalStorage } from "reactjs-localstorage";


const Login = () => {
    const [thisState,setThisState] = useState(false);
    //Set hooks for login:
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState("")
    //Set hooks for sign up:
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword,setSignUpPassword] = useState("")
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
    const [errorSignUp, setErrorSignUp] = useState("")
    //Other vars
    const navigate = useNavigate();

    //Login function
    const signIn =  async () =>{
        
        console.log('email:',loginEmail)
        console.log('password:', loginPassword)
        setErrorLogin("")
        try {
            console.log('start of try catch')
            const response = await axios.post("http://localhost:5001/verifyAccount", {
              email:loginEmail,
              password:loginPassword
            })
            console.log('response,',response);
            if(response.data.length === 0){
                console.log(response);
                setErrorLogin('Email or Password incorrect')
            }
            else
            {
                console.log(response);
                console.log('successful verification');
                reactLocalStorage.setObject('user', {'id': loginEmail});
                navigate("/list");
            }
          } catch (error) {
            console.log(error);
          }

    
        
    }
    //Signup function
    const signUp = async () =>{
        setErrorSignUp("");
        if (signUpPassword !== signUpConfirmPassword){
            setErrorSignUp("Password does not match");
            return;
        }
        try {
            console.log('email:',signUpEmail)
            console.log('password:', signUpPassword)
            console.log('confirm password:', signUpConfirmPassword)
            const response = await axios.post("http://localhost:5001/createAccount", {
              email:signUpEmail,
              password:signUpPassword
            });
            console.log('response,',response)
            setErrorSignUp("Successfully registered");
            navigate("/");
          } catch (error) {
            setErrorSignUp("Email is already registered");
            console.log(error);
          }
    }
    return (
      <div className="login">
                <div className={`login__colored-container ${thisState ? 'login__colored-container--left' : 'login__colored-container--right'}`}></div>
                <div className={`login__welcome-back ${thisState ? 'login__welcome-back--active' : 'login__welcome-back--inactive'}`}>
                    
                    <div className="login__welcome-back__logo-container">
                        DBS hackathon app
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
                <div className="login__login-container__logo-container">
                <div className={`login__create-container ${thisState ? 'login__create-container--active' : 'login__create-container--inactive'}`}>
                <div className = "login__login-container__box">
                <div className="login__login-container__box__logo-container">
                        Create Account
                    </div>
                    <span className="login__create-container--info-text">or use email for your registration</span>
                    <span className = 'error_login'>{errorSignUp}</span>
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
                    </div>
                </div>
                <div className={`login__login-container ${!thisState? 'login__login-container--active' : 'login__login-container--inactive'}`}>
                    <div className = "login__login-container__box">
                    <div className="login__login-container__box__logo-container">
                        DBS app
                    </div>
                    <div className="login__login-container__main-container">
                        <span className="login__login-container__main-container--info-text">or use email for your login</span>
                        <span className = 'error_login'>{errorLogin}</span>
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
                </div>
                <div className={`login__hello-container ${!thisState ? 'login__hello-container--active' : 'login__hello-container--inactive'}`}>
                    <div className="login__welcome-back__main-container__text-container">
                        <span className="login__welcome-back__main-container__text-container--title">
                            Hello!
                            </span>
                        <span className="login__welcome-back__main-container__text-container--secondary">
                            Enter your personal details to register
                        </span>
                    </div>
                    <div onClick={() => {
                        setThisState(true);
                    }} className="login__welcome-back__main-container__button-container">
                        Sign Up
                    </div>
                </div>
            </div>




  );
};
export default Login;