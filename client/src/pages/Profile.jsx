import confirmLogin from "../utils/confirmLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Profile() {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(confirmLogin())
        confirmLogin() || navigate('/login')
    }, [navigate])
    return (
        <div>Profile</div>
    )
}