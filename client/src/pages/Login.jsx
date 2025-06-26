import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { MyCheckbox, MySelect, MyTextInput } from '../utils/formElements';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate()
	return (
		<>
			<h1class="text-2xl font-bold text-center text-gray-800">Log in to an existing account</h1>
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
                            navigate('/')
						})
						.catch((error) => console.error(error))
						.finally(() => {
							setSubmitting(false);
						});
				}}>
                    <Form>
                        <MyTextInput name="username" type="text" label="Username" class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"/>
                        <MyTextInput name="password" type="password" label="Password"class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"/>
                        <button type="submit"class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition">Login</button>
                    </Form>
                </Formik>
                <Link to="/signup">Don't have an account? Sign up here</Link>
                <Link to="/reset-password">Forgot your password? Reset it here</Link>
		</>
	);
}
