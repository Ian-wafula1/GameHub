import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { MyTextInput } from '../utils/formElements';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import vid from '../assets/video1.mp4';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
	const navigate = useNavigate();
	const notify = (message, ...props) => toast(message, { theme: 'dark', ...props });

	return (
		<>
			<ToastContainer />
			<video className="fixed z-[-1] w-screen h-screen inset-0 max-w-none opacity-100 transform-none object-cover " autoPlay loop muted playsInline>
				<source src={vid} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="m-5 flex flex-col max-w-[580px] w-[80%] px-8 py-5 self-center my-20 bg-[#ffffff33] text-white text-lg font-semibold backdrop-blur-[10px] rounded-3xl ">
				<h1 className="text-3xl self-center mb-5">Log in</h1>
				<Formik
					initialValues={{
						username: '',
						password: '',
					}}
					validationSchema={Yup.object({
						username: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
						password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
					})}
					onSubmit={(values, { setSubmitting }) => {
						axios
							.post(`/api/login`, {
								username: values.username,
								password: values.password,
							})
							.then((response) => {
								let token = response.data.access_token;
								localStorage.setItem('token', token);
								navigate('/');
							})
							.catch((error) => notify(error))
							.finally(() => {
								setSubmitting(false);
							});
					}}>
					<Form className="flex flex-col gap-2 ">
						<MyTextInput name="username" type="text" label="Username" />
						<MyTextInput name="password" type="password" label="Password" />
						<button className="my-5 border-2 border-white bg-gray-700 transition-colors rounded-3xl px-4 py-[.6rem] hover:bg-slate-900  w-60 self-center" type="submit">
							Login
						</button>
					</Form>
				</Formik>
				<p className="text-slate-900">
					Don't have an account?{' '}
					<Link to="/signup" className="text-purple-900 underline">
						Sign up
					</Link>
				</p>
				<p className="text-slate-900">
					Forgot your password?{' '}
					<Link to="/reset-password" className="text-purple-900 underline">
						Reset password
					</Link>
				</p>
			</div>
		</>
	);
}
