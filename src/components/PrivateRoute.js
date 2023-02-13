import React, {useState, useContext, useEffect} from "react";
import {useLocalState} from "../util/useLocalStorage.js";
import {Navigate,Outlet} from "react-router-dom";
import {AccountContext} from "../scenes/accounts/Account";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import Authenticate from "./Auth";
import {reactLocalStorage} from 'reactjs-localstorage';
import jwt_decode from "jwt-decode";


//children -> the values in e.g <PrivateRoute><xxx/><PrivateRoute>
//1. Check if user is authenticated

const PrivateRoute =() =>{
    const { getSession,logout } = useContext(AccountContext);
    getSession().then(session =>{
        reactLocalStorage.setObject('jwt', {'jwt': session.accessToken.jwtToken})
        if (jwt_decode(reactLocalStorage.getObject('jwt').jwt).exp *1000 <Date.now()){
            logout()
        }
    });
    //const [jwt, setJwt] = useLocalState("","jwt");
    const [load,setload] = useState(()=>{
        return reactLocalStorage.getObject('Auth').logged
    });
    console.log('private route load state after use effect',load);
   
    useEffect(() => {
        if (load === undefined ){
            setload(false);
            console.log('updating state',reactLocalStorage.getObject('Auth').logged)
            reactLocalStorage.setObject('Auth', {'logged': false})
            /*return () => { 
                reactLocalStorage.getObject('Auth').logged ? <Outlet/>:<Navigate to = "/"/>;
        }*/
    }
    }, [load]);
    
    console.log('initial new state',load);
    useEffect(() => {
        console.log('final new state2',load);
        if (load === true){
            console.log('returning2....',reactLocalStorage.getObject('Auth').logged)
            /*return () => { 
                reactLocalStorage.getObject('Auth').logged ? <Outlet/>:<Navigate to = "/"/>;
        }*/
    }
    }, [load]);
    
    if (load === true){
        console.log('final stag2',load);
        console.log('final new local2',reactLocalStorage.getObject('Auth').logged)
        //return reactLocalStorage.getObject('Auth').logged ? <Outlet/>:<Navigate to = "/"/>;
        return <Outlet/>
    }
    else{
        console.log('access denied');
        return <Navigate to = "/"/>
    }

    /*

    console.log('localstorage,',reactLocalStorage.getObject('Auth').logged)
    return reactLocalStorage.getObject('Auth').logged ? <Outlet/>:<Navigate to = "/"/>;*/
};

export default PrivateRoute;