import React, {useEffect, useState} from "react";
import axios from "axios";
import Login from "./Login";
import useToken from "./useToken";

export default function Admin(){
    useEffect(() => {
            getUser()
        },[]);
        let [user, setUser] = useState([]);
    const {token, setToken} = useToken();
    function contains(arr, elem) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === elem) {
                return true;
            }
        }
        return false;
    }
    function getUser() {
        axios.get('https://polyclinic.herokuapp.com/api/user/', {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                setUser(response.data);

            })
    }
    if (!token) {
        return <Login setToken={setToken}/>
    }


    if (contains(user, 'ROLE_ADMIN')) {
        return (<div>
            <h1>Личный кабинет</h1>
            <form action="/admin/add">
                <button className="btn btn-primary">Добавить врача</button>
            </form>
            <br/>
            <form action="/logout">
                <button className="btn btn-secondary">Выйти</button>
            </form>
        </div>)
    }
}