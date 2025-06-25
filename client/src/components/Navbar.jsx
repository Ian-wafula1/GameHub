import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";

export default function Navbar() {

    location = useLocation()
    return (
        <header>
            <h2>GameHub</h2>
            {/* { location.pathname !== 'login'? <SearchBar />: null} */}
            <div>Cart logo</div>
        </header>
    )
}