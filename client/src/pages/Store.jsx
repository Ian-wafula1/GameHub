import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
// import getRandomPrice from '../utils/getRandomPrice';
import GameCard from '../components/GameCard';
import fetchPlatform from '../utils/fetchPlatform';
import fetchGenre from '../utils/fetchGenre';
import fetchTop from '../utils/fetchTop';
import fetchSaved from '../utils/fetchSaved';
import confirmLogin from '../utils/confirmLogin';
import { Trophy, Crown, LibraryBig } from 'lucide-react';
// import { Playstation, PC, XBox, Nintendo, IOS, Android, Action, Strategy, RPG, Shooter, Adventure, Puzzle, Racing, Sports } from '../assets/svgCustom';
import { PCIcon, PlaystationIcon, XboxIcon, NintendoIcon, IOSIcon, AndroidIcon,
	ActionIcon, StrategyIcon, RPGIcon, ShooterIcon, AdventureIcon,
	 PuzzleIcon, RacingIcon, SportsIcon } from '../assets/svgCustom';
import { useNavigate } from 'react-router-dom';

// const platforms = [
// 	['PC', 4],
// 	['PlayStation 5', 187],
// 	['Xbox', 1],
// 	['Nintendo Switch', 7],
// 	['iOS', 3],
// 	['Android', 21],
// ];
// switch variables to components
// const platforms = [
// 	['PC', 4, PC],
// 	['PlayStation 5', 187, Playstation],
// 	['Xbox', 1, XBox],
// 	['Nintendo Switch', 7, Nintendo],
// 	['iOS', 3, IOS],
// 	['Android', 21, Android],
// ];

const platforms = [
	['PC', 4, PCIcon],
	['PlayStation 5', 187, PlaystationIcon],
	['Xbox', 1, XboxIcon],
	['Nintendo Switch', 7, NintendoIcon],
	['iOS', 3, IOSIcon],
	['Android', 21, AndroidIcon],
]

// const platforms = [
// 	['PC', 4, <PC />],
// 	['PlayStation 5', 187, <Playstation />],
// 	['Xbox', 1, <XBox />],
// 	['Nintendo Switch', 7, <Nintendo />],
// 	['iOS', 3, <IOS />],
// 	['Android', 21, <Android />],
// ]

// const genres = ['action', 'strategy', 'rpg', 'shooter', 'adventure', 'puzzle', 'racing', 'sports'];
// const genres = [
// 	['action', Action],
// 	['strategy', Strategy],
// 	['rpg', RPG],
// 	['shooter', Shooter],
// 	['adventure', Adventure],
// 	['puzzle', Puzzle],
// 	['racing', Racing],
// 	['sports', Sports],
// ];

const genres = [
	['action', ActionIcon],
	['strategy', StrategyIcon],
	['rpg', RPGIcon],
	['shooter', ShooterIcon],
	['adventure', AdventureIcon],
	['puzzle', PuzzleIcon],
	['racing', RacingIcon],
	['sports', SportsIcon],
]

// const genres = [
// 	['action', <Action />],
// 	['strategy', <Strategy />],
// 	['rpg', <RPG />],
// 	['shooter', <Shooter />],
// 	['adventure', <Adventure />],
// 	['puzzle', <Puzzle />],
// 	['racing', <Racing />],
// 	['sports', <Sports />],
// ]

export default function Store() {
	const navigate = useNavigate()
	useEffect(() => {
			confirmLogin() ? true : navigate('/login')
	}, [navigate])
	const { games, setGames, title, setTitle } = useContext(AppContext);

	const [open, setOpen] = useState(false);
	const buttons = (
		<div className="fixed p-5 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-[40px] h-[100%] w-[100%] overflow-auto z-10 text-black">
			<div>
				<h3 className="text-[1.625rem] font-[600] mb-3 ">Top Games</h3>
				<div className='flex flex-col gap-3'>
					<div className="flex items-center gap-2">
						<div className='bg-black w-[40px] h-[40px] grid rounded-xl'>
							{' '}
							<Trophy className="h-[22px] fill-white self-center justify-self-center" />
						</div>
						<button onClick={() => {
							fetchTop({ setGames, setTitle })
							setOpen(false)
						}}>Best of all time</button>
					</div>
				</div>
			</div>
			<div>
				<h3 className="text-[1.625rem] font-[600] mb-3 ">Your Games</h3>
				<div className='flex flex-col gap-3'>
					<div className="flex items-center gap-2" onClick={() => {
						fetchSaved({ url: 'library', setGames, setTitle })
						setOpen(false)
					}}>
						<div className='bg-black w-[40px] h-[40px] grid rounded-xl'>
							<LibraryBig className="h-[22px] fill-white self-center justify-self-center" />
						</div>
						<button>Library</button>
					</div>
					<div className="flex items-center gap-2" onClick={() => {
						fetchSaved({ url: 'wishlist', setGames, setTitle })
						setOpen(false)
					}}>
						<div className='bg-black w-[40px] h-[40px] grid rounded-xl'>
							<Crown className="h-[22px] fill-white self-center justify-self-center" />
						</div>
						<button>Wishlist</button>
					</div>
				</div>
			</div>
			<div>
				<h3 className="text-[1.625rem] font-[600] mb-3 ">Platforms</h3>
				<div className='flex flex-col gap-3'>
					{platforms.map((x) => (
						<div className="flex items-center gap-2" key={x[0]}>
							<div className='bg-black w-[40px] h-[40px] grid rounded-xl'>
								{/* <x[2] /> */}
								{(() => {
									let Icon = x[2]
									return <Icon className="h-[22px] fill-white self-center justify-self-center" />
								})()}
							</div>
							<button  onClick={() => {
								fetchPlatform({ platform_id: x[1], setGames, setTitle, platform: x[0] })
								setOpen(false)
							}}>
								{x[0]}
							</button>
						</div>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-[1.625rem] font-[600] mb-3 ">Genres</h3>
				<div className='flex flex-col gap-3'>
					{genres.map((x) => (
						<div className="flex items-center gap-2" key={x[0]}>
							<div className='bg-black w-[40px] h-[40px] grid rounded-xl'> 
								{(() => {
									let Icon = x[1]
									return <Icon className="h-[22px] fill-white self-center justify-self-center" />
								})()} </div>
							<button  onClick={() => {
								fetchGenre({ genre_id: x[0], setGames, setTitle })
								setOpen(false)
							}}>
								{x[0]}
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);

	function handleClick() {
		setOpen(!open);
	}

	return (
		<>
			<div className="p-6 text-white">
				<h1 className="text-5xl font-bold mb-6">{title}</h1>

				<aside hidden>{buttons}</aside>
				<button onClick={handleClick} className="fixed bottom-3 right-3 z-10">
					{/* {buttons} */}
					<div className="cursor-pointer rounded-full  w-10 h-10 p-2 bg-white">
						{open ? (
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									{' '}
									<path
										d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
										fill="#0F0F0F"></path>{' '}
								</g>
							</svg>
						) : (
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									{' '}
									<path
										d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
										stroke="#000000"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"></path>{' '}
								</g>
							</svg>
						)}
					</div>
				</button>

				<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] *:min-h-[20rem] gap-6">
					{games.map((game) => (
						<GameCard key={game.id} game={game} />
					))}
				</div>
			</div>
			<div className={'bg-white z-5 fixed inset-0 transition-all ' + (open ? 'block' : 'hidden')}>{buttons}</div>
		</>
	);
}
