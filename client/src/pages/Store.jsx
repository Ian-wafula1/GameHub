import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
// import getRandomPrice from '../utils/getRandomPrice';
import GameCard from '../components/GameCard';
import fetchPlatform from '../utils/fetchPlatform';
import fetchGenre from '../utils/fetchGenre';
import fetchTop from '../utils/fetchTop';
import { useNavigate } from 'react-router-dom';
import fetchSaved from '../utils/fetchSaved';

const platforms = [
	['PC', 4],
	['PlayStation 5', 187],
	['PlayStation 4', 18],
	['Xbox', 1],
	['Nintendo Switch', 7],
	['iOS', 3],
	['Android', 21],
];
const genres = ['action', 'strategy', 'rpg', 'shooter', 'adventure', 'puzzle', 'racing', 'sports'];

export default function Store() {
	const navigate = useNavigate();
	if (!localStorage.getItem('token')) {
		navigate('/login');
	}
	const { games, setGames } = useContext(AppContext);
	const [title, setTitle] = useState('');
	return (
		<>
			<h1>{title}</h1>
			<aside>
				<button onClick={() => fetchSaved({ url: 'library', setGames, setTitle })}>Library</button>
				<button onClick={() => fetchSaved({ url: 'wishlist', setGames, setTitle })}>Wishlist</button>
				<button onClick={() => fetchTop({ setGames, setTitle })}>Best of all time</button>
				{platforms.map((x) => (
					<button key={x[0]} onClick={() => fetchPlatform({ platform_id: x[1], setGames, setTitle, platform: x[0] })}>
						{x[0]}
					</button>
				))}
				{genres.map((x) => (
					<button key={x} onClick={() => fetchGenre({ genre: x, setGames, setTitle })}>
						{x}
					</button>
				))}
			</aside>
			<div className="game">
				{games.map((game) => (
					<GameCard key={game.id} game={game} />
				))}
			</div>
		</>
	);
}
