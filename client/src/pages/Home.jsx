import '../index.css';
import NavButton from '../components/NavButton';
import { LucideDices, Trophy, Crown, LibraryBig } from 'lucide-react';
import Github from '../assets/github.svg';
import RawG from '../assets/RAWG.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import fetchSaved from '../utils/fetchSaved';
import fetchTop from '../utils/fetchTop';
import vid from '../assets/video2.mp4';

export default function Home() {
	const navigate = useNavigate();
	const { setGames, setTitle } = useContext(AppContext);

	async function fetchRandomGame() {
		let res = await axios.get(`https://api.rawg.io/api/games?page_size=1&page=${Math.floor(Math.random() * 100000) + 1}&key=6c8e0c847dd14ebd88f23676a432f0fa`);
		res = res.data.results[0];
		navigate(`/game/${res.id}`);
	}

	async function navigateSaved(url) {
		setTitle('Your ' + url);
		fetchSaved({ url: url.toLowerCase(), setGames, setTitle });
		navigate('/store');
	}

	async function navigateTop() {
		setTitle('Best of all time');
		fetchTop({ setGames, setTitle });
		navigate('/store');
	}

	return (
		<>
			<video className="fixed z-[-1] w-screen h-screen inset-0 max-w-none opacity-100 transform-none object-cover " autoPlay loop muted playsInline>
				<source src={vid} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="flex flex-col gap-[2rem] items-center *:flex *:flex-col lg:flex-row m-6 lg:justify-between lg:m-10 lg:mt-16">
				<div className=" *:bg-[#ffffff33] *:text-white *:text-lg *:font-semibold *:backdrop-blur-[17px] *:rounded-3xl *:p-6 gap-5 max-w-[550px] ">
					<div className="flex flex-col gap-4 items-center">
						<p className="logo text-3xl">Game Hub</p>
						<p>
							Welcome to GameHub — your ultimate destination for discovering, wishlisting, and buying the latest and greatest games. Browse a massive collection powered by real-time data, build your personal library, and keep track of every
							purchase.
						</p>
						<p></p>
					</div>

					<div className="flex gap-3 ">
						<NavButton handleClick={() => open('https://github.com/Ian-wafula1/GameHub')} logo={Github} label={'Github Repo'} />
						<NavButton handleClick={() => open('https://rawg.io/apidocs')} logo={RawG} label="RAWG API" />
					</div>
				</div>

				<div className=" bg-[#ffffff33] text-white text-lg font-semibold backdrop-blur-[10px] rounded-3xl px-5 pt-4 pb-8 gap-3 w-[max(40%,250px)] max-w-[250px] shrink items-center">
					<p className="text-xl">Quick Navigation</p>
					<NavButton handleClick={fetchRandomGame} icon={<LucideDices />} label={'Random Game'} />
					<NavButton handleClick={() => navigateSaved('Library')} label={'Library'} icon={<LibraryBig />} />
					<NavButton handleClick={() => navigateSaved('Wishlist')} label={'Wishlist'} icon={<Crown />} />
					<NavButton handleClick={navigateTop} label={'All time top'} icon={<Trophy />} />
				</div>
			</div>
		</>
	);
}
