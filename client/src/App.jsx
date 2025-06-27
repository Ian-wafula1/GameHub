import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import vid from './assets/video2.mp4';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import fetchTop from './utils/fetchTop';

function App() {
	const [loc, setLoc] = useState(window.location.pathname);
	console.log(loc);
	const {setGames, setTitle} = useContext(AppContext)
	// console.log(window.location.pathname);
	// window.addEventListener('popstate', () => {
	// 	setLoc(window.location.pathname);
	// });

	useEffect(() => {
		// setLoc(window.location.pathname);
		const handlePopState = () => {
			setLoc(window.location.pathname)
		};

		fetchTop({setGames, setTitle})

		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, []);
	return (
		<div className="flex flex-col gap-10">
			<Navbar></Navbar>
			<main>
				{loc === '/' ? (
					<video className="fixed z-[-1] w-screen h-screen inset-0 max-w-none opacity-100 transform-none object-cover " autoPlay loop muted playsInline>
						<source src={vid} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				) : null}
				<Outlet />
			</main>
		</div>
	);
}

export default App;
