import {useEffect, useState} from "react";
import useToken from "./useToken";
import axios from "axios";
import Login from "./Login";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './my.css'

function Order() {
    useEffect(() => {
        getUser()
        getAppointments()
    }, []);
    let [appointments, setAppointments] = useState([]);
    let [user, setUser] = useState([]);
    const {token, setToken} = useToken();

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
    function getAppointments() {
        axios.get('https://polyclinic.herokuapp.com/api/order/', {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                response.data.forEach(doctor =>{
                    switch (doctor.spec) {
                        case "SURGEON":
                            doctor.spec = "Хирург";
                            break
                        case "NEUROLOGIST":
                            doctor.spec = "Нейролог";
                            break
                        case "UROLOGIST":
                            doctor.spec = "Уролог";
                            break
                        case "OPHTHALMOLOGIST":
                            doctor.spec = "Офтальмолог";
                            break
                        case "OTOLARYNGOLOGIST":
                            doctor.spec = "Отоларинголог";
                            break

                    }
                })
                setAppointments(response.data);

            })
    }
    function setAppointment(id,date,time) {
        axios.post('https://polyclinic.herokuapp.com/api/order?id='+id+'&date='+date+'&time='+time,{},  {
                headers: {
                    'Authorization': token
                }
            }
        )
            .then(response => {
                getAppointments()
                return response;

            })
    }
    if(!token) {
        return <Login setToken={setToken}/>
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
        return (
            <div>
                <h2>Записаться ко врачу</h2>
                <form action="/home">
                    <button className="btn-secondary">Личный кабинет</button>
                </form>
                <br/>
                <table className="table table-bordered">
                    <thead>
                    <th>Специализация</th>
                    <th>Доктор</th>
                    <th>Свободные записи</th>
                    </thead>
                    <tbody>

                    {appointments.map(doctor =>
                        <tr>
                            <td>{doctor.spec}</td>
                            <td> {doctor.firstName} {" "} {doctor.lastName}</td>
                            <td>
                                <table>
                                    {doctor.freeMeets.map(date =>
                                        <tr>
                                            <td className="">{date.date}</td>
                                            {date.freeTimes.map(time =>
                                                <td>
                                                    <button className="button button1"
                                                            onClick={() => setAppointment(doctor.id, date.id, time.id)}> {time.time}</button>
                                                </td>)}
                                        </tr>
                                    )}
                                </table>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }

}
export default Order
