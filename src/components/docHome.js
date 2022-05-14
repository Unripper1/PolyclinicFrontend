import React, {useEffect, useState} from "react";
import axios from "axios";
import Login from "./Login";
import useToken from "./useToken";


function DocHome() {
    useEffect(() => {
        getUser()
        getAppointmentsDoc()
    }, []);
    let [user, setUser] = useState([]);
    let [appointmentsDoc, setAppointmentsDoc] = useState([]);
    const {token, setToken} = useToken();
    if (!token) {
        return <Login setToken={setToken}/>
    }

    function getAppointmentsDoc() {
        axios.get('https://polyclinic.herokuapp.com/api/doctor/appointments/', {
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
                setAppointmentsDoc(response.data);

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
            if (arr[i].name === elem) {
                return true;
            }
        }
        return false;
    }


    if (contains(user, 'ROLE_DOCTOR')) {
        return (
            <div>
                <h1>Личный кабинет</h1>
                <br/>
                {/*<h1><span>{doctor.firstName}"></span>&nbsp<span >{doctor.lastName}"></span></h1>*/}

                <form action="/logout">
                    <button className="btn-secondary">Выйти</button>
                </form>
                <br/>
                <h2>Действующие записи</h2>
                <table className="table">
                    <thead>
                    <th>id</th>
                    <th>Дата</th>
                    <th>Время</th>
                    <th>Кабинет</th>
                    <th>Клиент</th>
                    </thead>
                    <tbody>
                    {appointmentsDoc.map(appointment =>
                        <tr>
                            <td>{appointment.id}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.doctor.cabinet}</td>
                            <td>
                                <span>{appointment.customer.firstName}</span>{" "}<span>{appointment.customer.lastName}</span>
                            </td>
                            <td><form action={"/doctor/appointment/"+appointment.id}>
                                <button className="btn-secondary">Просмотр</button>
                            </form></td>

                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default DocHome