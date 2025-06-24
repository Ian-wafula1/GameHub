import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<>
			<Navbar></Navbar>
            <main>
                <Outlet />
            </main>
			<Footer></Footer>
		</>
	);
}

export default App;
