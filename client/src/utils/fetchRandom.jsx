import axios from 'axios';

export default async function fetchRandom({ setGames, setTitle }) {
	const res = await axios.get(`https://api.rawg.io/api/games?page=${Math.ceil(Math.random() * 10000)}&key=6c8e0c847dd14ebd88f23676a432f0fa`);
	setGames(res.data.results);
	setTitle('Store');
}
