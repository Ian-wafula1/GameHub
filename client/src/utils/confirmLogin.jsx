// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import axios from "axios";

export default async function confirmLogin() {
    // const navigate = useNavigate();
	if (!localStorage.getItem('token') || localStorage.getItem('token') == undefined) {
		return false
	}
    // useEffect(() => {
    //     axios.get('/api/me', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    //     .then(res => {
    //         if (res.status != 200) {
    //             navigate('/login')
    //         }
    //     })
    // }, [navigate])
    // axios.get('/api/check_login', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    // .then(res => {
    //     console.log('reached')
    //     console.log(res.status == 200)
    //     return res.status == 200
    // })
    let res = await axios.get('/api/check_login', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    return res.status == 200
}