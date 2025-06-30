import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { AppContext } from './context/AppContext';

function App() {
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
