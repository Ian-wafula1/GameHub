import axios from 'axios';

export default async function fetchSaved({ url, setGames, setTitle }) {
	setTitle(`Your ${url}`);
	let games = await axios.get(`/api/${url}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
	games = games.data;
	console.log(games);
	let fetchedGames = [];
	games.forEach((game) => {
		axios
			.get(`https://api.rawg.io/api/games/${game.api_game_id}?key=6c8e0c847dd14ebd88f23676a432f0fa`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			.then((res) => {
				fetchedGames.push(res.data);
			})
			.catch((err) => console.log(err));
	});
	setGames(fetchedGames);
}
