import React, {useEffect, useLayoutEffect, useState} from "react";
import useToken from "./useToken";
import Login from "./Login";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
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
        axios.get('https://polyclinic.herokuapp.com/api/appointments/', {
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

    function deleteAppointment(id) {
        axios.delete('https://polyclinic.herokuapp.com/api/delapp/' + id, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                getAppointments()
                return response;
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


    if (contains(user, 'ROLE_USER')) {

        return (

            <div>
                <h1>Личный кабинет</h1>
                <br></br>
                <form action="/order">
                    <button className="btn btn-secondary">Записаться ко врачу</button>
                </form>
                <br></br>
                <form action="/results">
                    <button className="btn btn-secondary">Посмотреть результаты посещений</button>
                </form>
                <br></br>
                <form action="/logout">
                    <button className="btn btn-secondary">Выйти</button>
                </form>
                <br/>
                <div className="bg">
                <h2>Действующие записи</h2>
                <br/>
                {/*{appointments.map()}*/}
                <table className="table" >
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Кабинет</th>
                        <th>Врач</th>
                        <th>Специализация</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map(appointment =>
                        <tr>
                            <td> {appointment.id}</td>
                            <td> {appointment.date}</td>
                            <td> {appointment.time}</td>
                            <td> {appointment.doctor.cabinet}</td>
                            <td>
                                <span>{appointment.doctor.firstName}</span>{' '}<span>{appointment.doctor.lastName}</span>
                            </td>
                            <td> {appointment.doctor.spec}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteAppointment(appointment.id)}>Удалить</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>

                </div>
            </div>
        )
    }
}
export default Home;