import axios from "axios";
import {useState} from "react";

import validator from 'validator';
export default function Registration () {

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
            password: ""
        }
    })


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
            url: 'https://polyclinic.herokuapp.com/api/auth/registration',
            headers: {
                'Content-Type': 'application/json',
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
                password: register.password
            })
        }).then(res => {
            if (res.data === true) {
                window.location.href = "/auth"
            } else {
                alert("There is already a user with this email")
            }
        }).catch(() => {
            alert("An error occurred on the server")
        })
    }


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
