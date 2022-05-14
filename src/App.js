import logo from './logo.svg';
import './App.css';
import Home from "./components/Home.js";
import useToken from "./components/useToken";
import Login from "./components/Login";

import {BrowserRouter, Router, Route, Switch, Redirect, NavLink, Routes} from 'react-router-dom';
import {Component} from "react";
import Order from "./components/Order";
import Results from "./components/Results";
import DocHome from "./components/docHome";
import AppointDoc from "./components/AppointDoc";
import Registration from "./components/Registration";
import Admin from "./components/Admin";
import React from "react";
import Enter from "./components/Enter";
import RegDoc from "./components/RegDoc";
import Logout from "./components/Logout";



function App(){
        // const {token, setToken} = useToken();
        // if(!token) {
        //     return <Login setToken={setToken}/>
        // }
    const {token, setToken} = useToken();

        return (
            <div className="App">
                <BrowserRouter>
                    <Routes>
                    <Route exact path="/home" element={<Home />} />
                        <Route exact path="/" element={<Enter/>} />
                        <Route exact path="/order" element={<Order />} />
                        <Route exact path="/results" element={<Results />} />
                        <Route path="/doctor" element={<DocHome />} />
                        <Route path="/doctor/appointment/:id" element={<AppointDoc/>} />
                        <Route path="/registration" element={<Registration/>} />
                        <Route path="/auth" element={<Login setToken={setToken} />}  />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/add" element={<RegDoc/>} />
                        <Route path="/logout" element={<Logout/>} />
                    </Routes>
                </BrowserRouter>
         </div>)
    }
export default App
