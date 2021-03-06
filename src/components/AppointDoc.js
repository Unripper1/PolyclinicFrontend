import React, {useEffect, useLayoutEffect, useState} from "react";
import useToken from "./useToken";
import Login from "./Login";
import axios from "axios";
import {useParams} from "react-router-dom";

function AppointDoc(input, init) {
    useLayoutEffect(() => {
        getUser()
        getHistory()

    }, []);
    let [user, setUser] = useState([]);
    let [history, setHistory] = useState([]);
    const {token, setToken} = useToken();
    const params =useParams();
    if (!token) {
        return <Login setToken={setToken}/>
    }
    const handleSubmit = e => {
        postResult(e);
    };

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
    function postResult(event){
        fetch('https://polyclinic.herokuapp.com/api/doctor/app/'+params.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            mode: 'cors',
            cache: 'no-cache',
            body:JSON.stringify({
                diagnosis: event.target.diagnosis.value,
                therapy: event.target.therapy.value,
                description: event.target.description.value
            })
        }).then(res =>{
            return res.data;
        })
            .catch(function (error) {
                alert(error);
                console.log(error);
            });
    }


    function getHistory() {
        axios.get('https://polyclinic.herokuapp.com/api/doctor/appointment/'+params.id, {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                response.data.forEach(appointment =>{
                    switch (appointment.doctor.spec) {
                        case "SURGEON":
                            appointment.doctor.spec = "????????????";
                            break
                        case "NEUROLOGIST":
                            appointment.doctor.spec = "????????????????";
                            break
                        case "UROLOGIST":
                            appointment.doctor.spec = "????????????";
                            break
                        case "OPHTHALMOLOGIST":
                            appointment.doctor.spec = "??????????????????????";
                            break
                        case "OTOLARYNGOLOGIST":
                            appointment.doctor.spec = "??????????????????????????";
                            break
                    }
                })
                setHistory(response.data);

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
                <h1>???????????????? ??????????????????</h1>
                <br/>
                <form action="/doctor">
                    <button className="btn-secondary">???????????? ??????????????</button>
                </form>
                <br/>

                <form onSubmit={handleSubmit} action="/doctor">
                    <label>
                        <p>??????????????</p>
                        <textarea name="diagnosis"/>
                    </label>
                    <br/>
                    <label>
                        <p>??????????????</p>
                        <textarea name="therapy"></textarea>
                    </label>
                    <br/>
                    <label>
                        <p>??????????????????</p>
                        <textarea name="description"></textarea>
                    </label>
                    <br/>
                    <div>
                        <button className="btn-secondary" type="submit">??????????????????</button>
                    </div>
                </form>
                <br/>
                <h1>??????????????</h1>
                <table className="table">
                    <thead>
                    <th>id</th>
                    <th>????????</th>
                    <th>??????????</th>
                    <th>????????</th>
                    <th>??????????????????????????</th>
                    <th>??????????????</th>
                    <th>??????????????</th>
                    <th>??????????????????</th>
                    </thead>
                    <tbody>
                    {history.map(appointment =>
                        <tr>
                            <td>{appointment.result.id}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>
                                <span>{appointment.doctor.firstName}</span>{" "}<span>{appointment.doctor.lastName}</span>
                            </td>
                            <td>{appointment.doctor.spec}</td>
                            <td>{appointment.result.diagnosis}</td>
                            <td>{appointment.result.therapy}</td>
                            <td>{appointment.result.description}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

        )
    }
}
export default AppointDoc