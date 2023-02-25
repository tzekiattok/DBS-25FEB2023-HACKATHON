import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { reactLocalStorage } from "reactjs-localstorage";

const ProtectedRoute =() =>{
    if (!reactLocalStorage.getObject('user').id){
    return <Navigate to="/" replace />;
    }

    return <Navigate to="/dashboard" replace />;
}
export default ProtectedRoute