import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import vid from './assets/video2.mp4';
import vid2 from './assets/video1.mp4';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
// import fetchTop from './utils/fetchTop';
import fetchRandom from './utils/fetchRandom';

function App() {
	const [loc, setLoc] = useState(window.location.pathname);
	// console.log(loc);
	const {setGames, setTitle} = useContext(AppContext)
	// console.log(window.location.pathname);
	// window.addEventListener('popstate', () => {
	// 	setLoc(window.location.pathname);
	// });

	useEffect(() => {
		// setLoc(window.location.pathname);
		const handlePopState = () => {
			setLoc(window.location.pathname)
			console.log(window.location.pathname)
		};

		fetchRandom({setGames, setTitle})

		window.addEventListener('hashchange', handlePopState);

		return () => {
			window.removeEventListener('hashchange', handlePopState);
		};
	}, [setGames, setTitle]);
	return (
		<div className="flex flex-col">
			<Navbar></Navbar>
			<main className='flex flex-col'>
				{['/', '/signup', '/login', '/reset-password'].includes(loc) ? (
					<video className="fixed z-[-1] w-screen h-screen inset-0 max-w-none opacity-100 transform-none object-cover " autoPlay loop muted playsInline>
						<source src={loc === '/'? vid: vid2} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				) : null}
				<Outlet />
			</main>
		</div>
	);
}

export default App;
