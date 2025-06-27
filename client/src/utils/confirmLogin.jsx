import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function useLogin() {
    const navigate = useNavigate();
	if (!localStorage.getItem('token') || localStorage.getItem('token') == undefined) {
		navigate('/login');
	}
    useEffect(() => {
        axios.get('/api/me', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(res => {
            if (res.status != 200) {
                navigate('/login')
            }
        })
    }, [navigate])
}