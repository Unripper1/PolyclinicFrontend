import React from 'react';
import axios from 'axios';

export default function Login({setToken}) {
    const handleSubmit = async e => {
        e.preventDefault();
        const user = loginUser(e);
        user.then(data => {
            if (data != null) {
                console.log(data);
                setToken(data.tokenType + ' ' + data.accessToken);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
                <p>Email</p>
                <input type="text" id="username" />
            <br/>
                <p>Пароль</p>
                <input type="password" id="password" />
            <br/>
            <p>Как
                <br/>
                <select id="type">
                <option selected value="CUSTOMER">Клиент</option>
                <option value="DOCTOR">Врач</option>
                    <option value="ADMIN">Администратор</option>
            </select>
            </p>

            <div>
                <button className="btn btn-primary" type="submit">Войти</button>
            </div>
        </form>
    );
}
function contains(arr, elem) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === elem) {
            return true;
        }
    }
    return false;
}


function loginUser(event) {
    return axios({
        method: 'post',
        url: 'https://polyclinic.herokuapp.com/api/auth/signin',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: JSON.stringify({
            username: event.target.username.value,
            password: event.target.password.value
        })
    }).then(function (response) {
        if(event.target.type.value==="CUSTOMER" && contains(response.data.roles, "ROLE_USER"))
            window.location.href = "/home"
        else if(event.target.type.value==="DOCTOR" && contains(response.data.roles, "ROLE_DOCTOR"))
            window.location.href = "/doctor"
        else if(event.target.type.value==="ADMIN" && contains(response.data.roles, "ROLE_ADMIN"))
            window.location.href = "/admin"
        else alert("Ошибка")
        return response.data;
    })
        .catch(function (error) {
            alert(error);
            console.log(error);
        });

}