import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { MyCheckbox, MySelect, MyTextInput } from '../utils/formElements';
import * as Yup from 'yup';
import axios from 'axios';
import vid from '../assets/video1.mp4';

export default function ResetPassword() {
	const navigate = useNavigate();
	return (
		<>
		<video className="fixed z-[-1] w-screen h-screen inset-0 max-w-none opacity-100 transform-none object-cover " autoPlay loop muted playsInline>
						<source src={vid} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
		<div className='m-5 flex flex-col gap-5 max-w-[550px] w-[80%] px-8 pt-5 self-center bg-[#ffffff33] text-white text-lg font-semibold backdrop-blur-[10px] rounded-3xl '>
			<h1 className="text-3xl self-center mb-5 text-center">Reset your password</h1>
			<Formik
				initialValues={{
					username: '',
					password: '',
					email: '',
				}}
				validationSchema={Yup.object({
					username: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
					password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
					email: Yup.string().email('Invalid email address').required('Required'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					axios
						.post(`/api/reset_password`, {
							username: values.username,
							password: values.password,
							email: values.email,
						})
						.then(() => {
							navigate('/login');
						})
						.catch((error) => console.error(error))
						.finally(() => {
							setSubmitting(false);
						});
				}}>
				<Form className='flex flex-col gap-2  '>
					<MyTextInput name="username" type="text" label="Username" />
					<MyTextInput name="email" type="email" label="Email" />
					<MyTextInput name="password" type="password" label="Password" />
					<button className='my-5 border-2 border-white bg-gray-700 transition-colors rounded-3xl px-4 py-[.6rem] hover:bg-slate-900 w-[60%] min-w-[180px] shrink self-center' type="submit">Reset password</button>
				</Form>
			</Formik>
		</div></>
	);
}
