import React, {useEffect, useState} from "react";
import useToken from "./useToken";
import Login from "./Login";
import axios from "axios";

function Results() {
    useEffect(() => {
        getUser()
        getAppointments()
    }, []);
    let [user, setUser] = useState([]);
    let [appointments, setAppointments] = useState([]);
    const {token, setToken} = useToken();

    if (!token) {
        return <Login setToken={setToken}/>
    }
    function getAppointments() {
        axios.get('https://polyclinic.herokuapp.com/api/results/', {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                response.data.forEach(appointment =>{
                    switch (appointment.doctor.spec) {
                        case "SURGEON":
                            appointment.doctor.spec = "Хирург";
                            break
                        case "NEUROLOGIST":
                            appointment.doctor.spec = "Нейролог";
                            break
                        case "UROLOGIST":
                            appointment.doctor.spec = "Уролог";
                            break
                        case "OPHTHALMOLOGIST":
                            appointment.doctor.spec = "Офтальмолог";
                            break
                        case "OTOLARYNGOLOGIST":
                            appointment.doctor.spec = "Отоларинголог";
                            break
                    }
                })
                setAppointments(response.data);

            })
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

    function contains(arr, elem) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === elem) {
                return true;
            }
        }
        return false;
    }
    function contains(arr, elem) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name === elem) {
                return true;
            }
        }
        return false;
    }


    if (contains(user, 'ROLE_USER')) {
        return (<div>
            <h1>Результаты посещений</h1>
            <br/>
            <form action="/home">
                <button className="btn-secondary">Личный кабинет</button>
            </form>
            <br/>
            <br/>
            <table className="table">
                <thead>
                <th>id</th>
                <th>Дата</th>
                <th>Время</th>
                <th>Врач</th>
                <th>Специализация</th>
                <th>Диагноз</th>
                <th>Терапия</th>
                <th>Пояснение</th>
                </thead>
                <tbody>
                {appointments.map(appointment =>
                    <tr>
                        <td>{appointment.result.id}</td>
                        <td> {appointment.date}</td>
                        <td>{appointment.time}</td>
                        <td><span>{appointment.doctor.firstName}</span>{" "}<span>{appointment.doctor.lastName}</span>
                        </td>
                        <td>{appointment.doctor.spec}</td>
                        <td>{appointment.result.diagnosis}</td>
                        <td>{appointment.result.therapy}</td>
                        <td>{appointment.result.description}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>)
    }


}
export default Results