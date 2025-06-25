import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { MyCheckbox, MySelect, MyTextInput } from '../utils/formElements';
import * as Yup from 'yup';
import axios from 'axios';

export default function ResetPassword() {
	const navigate = useNavigate();
	return (
		<>
			<h1>Reset your password</h1>
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
				<Form>
					<MyTextInput name="username" type="text" label="Username" />
					<MyTextInput name="email" type="email" label="email" />
					<MyTextInput name="password" type="password" label="Password" />
					<button type="submit">Reset Password</button>
				</Form>
			</Formik>
		</>
	);
}
