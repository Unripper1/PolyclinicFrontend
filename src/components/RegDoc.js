import {useState} from "react";
import validator from "validator";
import axios from "axios";
import useToken from "./useToken";
import Login from "./Login";
import React from "react";
import {useEffect} from "react";

export default function RegDoc(){
    useEffect(() => {
        getUser()
    }, []);
    const [register, setRegister] = useState(() => {
        return {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            day: "",
            month: "",
            year:"",
            number: "",
            password: "",
            spec: "",
            cab: ""
        }
    })
    const {token, setToken} = useToken();
    let [user, setUser] = useState([]);

    if (!token) {
        return <Login setToken={setToken}/>
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


    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }


    const submitChackin = event => {
        event.preventDefault();
        if(!validator.isEmail(register.email)) {
            alert("You did not enter email")
        }
        else {
            console.log(register)
            postResult(event)
        }
    }




    function postResult(event){
        axios({
            method: 'post',
            url: 'https://polyclinic.herokuapp.com/api/admin/regdoc',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: JSON.stringify({
                firstName: register.firstName,
                lastName: register.lastName,
                login: register.email,
                gender: register.gender,
                day: register.day,
                month: register.month,
                year: register.year,
                number: register.number,
                password: register.password,
                spec: register.spec,
                cabinet: register.cab
            })
        }).then(res => {
            if (res.data === true) {
                window.location.href = "https://localhost:3000/admin"
            } else {
                alert("There is already a user with this email")
            }
        }).catch(() => {
            alert("An error occurred on the server")
        })
    }
    function contains(arr, elem) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === elem) {
                return true;
            }
        }
        return false;
    }

    if (contains(user, 'ROLE_ADMIN')) {
        return (
            <div className="form">
                <h2>Регистрация</h2>
                <form onSubmit={submitChackin}>
                    <p>Имя: <input
                        type="username"
                        id="firstname"
                        name="firstName"
                        value={register.firstName}
                        onChange={changeInputRegister}
                    /></p>
                    <p>Фамилия: <input
                        type="username"
                        id="lastName"
                        name="lastName"
                        value={register.lastName}
                        onChange={changeInputRegister}
                    /></p>
                    <p>Email: <input
                        type="email"
                        id="email"
                        name="email"
                        value={register.email}
                        onChange={changeInputRegister}
                    /></p>
                    <p>День рождения <input
                        type="number"
                        id="day"
                        name="day"
                        value={register.day}
                        onChange={changeInputRegister}
                    /></p>
                    <p>Месяц рождения <input
                        type="number"
                        id="month"
                        name="month"
                        value={register.month}
                        onChange={changeInputRegister}
                    /></p>
                    <p>Год рождения <input
                        type="number"
                        id="year"
                        name="year"
                        value={register.year}
                        onChange={changeInputRegister}
                    /></p>


                    <p>Пол: <select name="gender" value={register.gender} onChange={changeInputRegister}>
                        <option selected value="MALE">Мужчина</option>
                        <option value="FEMALE">Женщина</option>
                    </select>
                    </p>

                    <p>Номер телефона<input
                        type="number"
                        id="number"
                        name="number"
                        value={register.number}
                        onChange={changeInputRegister}
                    /></p>
                    <p>Пол: <select name="spec" value={register.spec} onChange={changeInputRegister}>
                        <option selected value="SURGEON">Хирург</option>
                        <option value="NEUROLOGIST">Нейролог</option>
                        <option value="UROLOGIST">Уролог</option>
                        <option value="OPHTHALMOLOGIST">Офтальмолог</option>
                        <option value="OTOLARYNGOLOGIST">Отоларинголог</option>
                    </select>
                    </p>
                    <p>Кабинет <input
                        type="number"
                        id="cab"
                        name="cab"
                        value={register.cab}
                        onChange={changeInputRegister}
                    /></p>

                    <p>Пароль: <input
                        type="password"
                        id="password"
                        name="password"
                        value={register.password}
                        onChange={changeInputRegister}
                    /></p>
                    <input type="submit"/>
                </form>
            </div>
        )
    }

}
