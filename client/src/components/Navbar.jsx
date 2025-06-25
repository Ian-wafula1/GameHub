import SearchBar from "./SearchBar";
// import { useLocation } from "react-router-dom";
import { useRef } from "react";

export default function Navbar() {

    // location = useLocation()
    // console.log(location)
    const loc = useRef(window.location.pathname)
    // console.log(window.location.pathname)
    return (
        <header>
            <h2>GameHub</h2>
            { ['/login', '/signup', '/reset-password'].includes(loc.current)? null: <SearchBar />}
            <div>Cart logo</div>
        </header>
    )
}