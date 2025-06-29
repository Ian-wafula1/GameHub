import Navbar from './components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { AppContext } from './context/AppContext';

function App() {
	const location = useLocation();
	console.log(location.pathname);
	const currentLoc = window.location.pathname;
	console.log(currentLoc);
	return (
		<div className="flex flex-col">
			<Navbar></Navbar>
			<main className="flex flex-col">
				<Outlet />
			</main>
		</div>
	);
}

export default App;
