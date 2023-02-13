import React, {useState, useContext, useEffect} from "react";
import {useLocalState} from "../util/useLocalStorage.js";
import {Navigate,Outlet} from "react-router-dom";
import {AccountContext} from "../scenes/accounts/Account";
import {CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
import Pool from "../UserPool";
import Auth from "./Auth";
import {reactLocalStorage} from 'reactjs-localstorage';
//Reroute authenticated users from signin or login page to landing page
const AuthenticatedRoute =() =>{
    //const [jwt, setJwt] = useLocalState("","jwt");
    //console.log('localstorage,',reactLocalStorage.getObject('Auth').logged)
    //return reactLocalStorage.getObject('Auth').logged ? <Navigate to = "/resources"/> :<Outlet/>;
    const [load,setload] = useState(()=>{
        return reactLocalStorage.getObject('Auth').logged
    });
    console.log('initial new state',load);
    useEffect(() => {
        console.log('final new state1',load);
        if (load === false ){
            console.log('returning....',reactLocalStorage.getObject('Auth').logged)
            /*return () => { 
                reactLocalStorage.getObject('Auth').logged ? <Outlet/>:<Navigate to = "/"/>;
        }*/
    }
    }, [load]);
    useEffect(() => {
        console.log('final new state1',load);
        if (load === undefined ){
            console.log('updating state',reactLocalStorage.getObject('Auth').logged)
            reactLocalStorage.setObject('Auth', {'logged': false})
            /*return () => { 
                reactLocalStorage.getObject('Auth').logged ? <Outlet/>:<Navigate to = "/"/>;
        }*/
    }
    }, [load]);
    
    if (load === false){
        console.log('final stage',load);
        console.log('final new local',reactLocalStorage.getObject('Auth').logged)
        //return reactLocalStorage.getObject('Auth').logged ? <Outlet/>:<Navigate to = "/"/>;
        return <Outlet/>
    }
    else{
        console.log('heading to resources');
        return <Navigate to = "/resources"/>
    }
};

export default AuthenticatedRoute;