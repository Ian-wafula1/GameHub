// import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';

export default function SearchBar() {
	const { searchTerm, setSearchTerm, setGames } = useContext(AppContext);
	const navigate = useNavigate();
	const location = useLocation();

	function handleSubmit(e) {
		e.preventDefault();
		axios
			.get(`https://api.rawg.io/api/games?search=${searchTerm}&key=6c8e0c847dd14ebd88f23676a432f0fa`)
			.then((res) => {
				setGames(res.data.results);
				if (location.pathname !== '/store') {
					navigate('/store');
				}
			})
			.catch((err) => console.log(err));
	}

	return <input type="search" onSubmit={handleSubmit}
     value={searchTerm} id="search" onChange={(e) => setSearchTerm(e.target.value)}  
     placeholder="Search for your favourite game" />
}
