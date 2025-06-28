import { useNavigate } from 'react-router-dom';
import { PCIcon, PlaystationIcon, XboxIcon, NintendoIcon, IOSIcon, AndroidIcon, WebIcon } from '../assets/svgCustom';

const platforms = [
	['PC', 4, PCIcon],
	['PlayStation', 187, PlaystationIcon],
	['Xbox', 1, XboxIcon],
	['Nintendo', 7, NintendoIcon],
	['iOS', 3, IOSIcon],
	['Android', 21, AndroidIcon],
	['Web', 32, WebIcon],
	['Apple Macintosh', 14, IOSIcon],
];

export default function GameCard({ game }) {
	const navigate = useNavigate();

	function handleClick() {
		navigate(`/game/${game.id}`);
	}

	return (
		<div className="rounded-3xl overflow-hidden bg-neutral-800 pb-3 max-h-[450px]" onClick={handleClick}>
			<img className="inset-0 h-[70%] w-full " src={game?.background_image || 'https://placehold.co/600x400/grey/black'} alt={game.name} />
			<div className="inset-0 flex flex-col justify-between px-4 pt-3">
				{/* <p>Rating: {game.rating || 'Unlisted'}</p> */}
				{/* <p>Release Date: {game.released || 'Unlisted'}</p> */}
				<p className="font-bold text-green-700 flex gap-2">
					{(() => {
						let games = game?.parent_platforms?.map((x) => x.platform.name);
						let foundPlatforms = [];
						return games?.map((game) => {
							let found = platforms?.find((platform) => platform[0] === game);
							// platforms.push(found || [game, game])
							if (found) {
								if (!foundPlatforms.includes(found)) {
									foundPlatforms.push(found);
									let Icon = found[2];
									return <Icon key={found[1]} className="w-4 h-4 fill-green-700" />;
								} else return null;
							} else return null;
						});
					})() || 'Unlisted'}
				</p>
				<p className="text-lg font-semibold text-gray-300">{game?.genres?.map((genre) => genre.name)?.join(', ') || 'Unlisted'}</p>
				<h1 className="text-2xl font-bold">{game.name || 'Unlisted'}</h1>
			</div>
		</div>
	);
}
