import axios from "axios";
import useToken from "./useToken";
import {useEffect, useLayoutEffect, useState} from "react";

export default function Logout(){
    // useLayoutEffect(() => {
    //     getUser()
    // }, []);
    const {token} = useToken();
    let [user, setUser] = useState([]);
    function getUser() {
        axios.get('https://polyclinic.herokuapp.com/api/auth/id', {
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                setUser(response.data);

            })
    }
    function exit(user){
        axios.post('https://polyclinic.herokuapp.com/api/auth/logout/'+user, [
        ],{
            headers: {
                'Authorization': token
            }
        })
            .then(response => {
                window.location.href = "/"

            })
    }
    getUser()
    return(
        exit(user)
    )
}
