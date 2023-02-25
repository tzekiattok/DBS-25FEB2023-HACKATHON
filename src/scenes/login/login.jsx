
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
    const [loginId, setLoginId] = useState("");
    const [loginPassword,setLoginPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState("")
    //Set hooks for sign up:
    const [signUpFirstName, setSignUpFirstName] = useState("");
    const [signUpLastName, setSignUpLastName] = useState("");
    const [signUpAge, setSignUpAge] = useState("");
    const [signUpPassword,setSignUpPassword] = useState("")
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
    const [errorSignUp, setErrorSignUp] = useState("")
    //Other vars
    const navigate = useNavigate();

    //Login function
    const signIn =  async () =>{
        
        console.log('email:',loginId)
        console.log('password:', loginPassword)
        setErrorLogin("")
        try {
            console.log('start of try catch')
            const response = await axios.post("http://localhost:5001/verifyAccount", {
              EmployeeID:loginId,
              Password:loginPassword
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
                reactLocalStorage.setObject('user', {'id': loginId});
                
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

        console.log('FN:',signUpFirstName)
        console.log('LN:',signUpLastName)
        console.log('Age:',signUpAge)
        console.log('password:', signUpPassword)
        console.log('confirm password:', signUpConfirmPassword)

        const response = await axios.post("http://localhost:5001/createAccount", {
        firstName:signUpFirstName,
        lastName:signUpLastName,
        age:signUpAge,
        password:signUpPassword,
        });
            console.log('response,',response)
            setErrorSignUp("Successfully registered");
            navigate("/");
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
                    <span className="login__create-container--info-text">Register to access your insurance details</span>
                    <span className = 'error_login'>{errorSignUp}</span>
                    <div className="login__create-container__form-container">
                        <form className="login__create-container__form-container__form" onSubmit={(e) => {
                            e.preventDefault();
                            signUp();
                        }}>
                          
                           
                                <input
                                    className="login__login-container__main-container__form-container__form--email"
                                    type="text"
                                    placeholder="First Name"
                                    onChange = {(event)=> setSignUpFirstName(event.target.value)}
                                    /*value={this.state.signInForm.email}
                                    onChange={(value) => this.setState({
                                        signInForm: {
                                            email: value.target.value,
                                            password: this.state.signInForm.password
                                        }
                                    })}*/
                                    required />
                                    <input
                                    className="login__login-container__main-container__form-container2__form--email"
                                    type="text"
                                    placeholder="Last Name"
                                    onChange = {(event)=> setSignUpLastName(event.target.value)}

                                    /*value={this.state.signInForm.email}
                                    onChange={(value) => this.setState({
                                        signInForm: {
                                            email: value.target.value,
                                            password: this.state.signInForm.password
                                        }
                                    })}*/
                                    required />
                                    <input
                                    className="login__login-container__main-container__form-container__form--email"
                                    type="number"
                                    placeholder="Age"
                                    onChange = {(event)=> setSignUpAge(event.target.value)}
                                    /*value={this.state.signInForm.email}
                                    onChange={(value) => this.setState({
                                        signInForm: {
                                            email: value.target.value,
                                            password: this.state.signInForm.password
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
                        <span className="login__login-container__main-container--info-text">Log in to access insurance</span>
                        <span className = 'error_login'>{errorLogin}</span>
                        <div className="login__login-container__main-container__form-container">
                            <form className="login__login-container__main-container__form-container__form" onSubmit={(e) => {
                                e.preventDefault();
                                signIn();
                            }}>
                                <input
                                    className="login__login-container__main-container__form-container__form--email"
                                    type="text"
                                    placeholder="EmployeeID"
                                    onChange = {(event)=> setLoginId(event.target.value)}
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