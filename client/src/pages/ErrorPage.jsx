import error from '../assets/error.png';
import Navbar from '../components/Navbar';

export default function ErrorPage() {
	return (
		<div>
            <Navbar />
			<div className="flex flex-col gap-5 items-center text-white py-3 px-5 md:mb-10">
				<img className='md:w-1/2 ' src={error} alt="error" />
				<h1 className='logo text-3xl font-bold text-blue-600'>PAGE NOT FOUND</h1>
			</div>
		</div>
	);
}
