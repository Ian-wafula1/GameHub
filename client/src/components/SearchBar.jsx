// import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

export default function SearchBar() {
	// const { searchTerm, setGames } = useContext(AppContext);
    // const navigate = useNavigate()
    // const location = useLocation()
    
    // function handleSubmit(e) {
    //     e.preventDefault();
        // console.log(searchTerm.current);
        // axios.fetch(`https://api.rawg.io/api/games?search=${searchTerm}&key=6c8e0c847dd14ebd88f23676a432f0fa`)
        // .then(res => {
        //     setGames(res.results)
        //     console.log(res.results)
        //     // if (location.pathname !== '/store') {
        //     //     navigate('/store')
        //     // }
        // })
        // .catch(err => console.log(err))
        
    // }
    return <p>SearchBar</p>
		// <form onSubmit={handleSubmit}>
		// 	{/* <input type="search" value={searchTerm.current} onChange={(e) => (searchTerm.current = e.target.value)} placeholder="Search for your favourite game" /> */}
		// </form>
	
}
