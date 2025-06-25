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
			<h1>Log in to an existing account</h1>
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
							let token = response.access_token;
							localStorage.setItem('token', token);
                            navigate('/')
						})
						.catch((error) => console.error(error))
						.finally(() => {
							setSubmitting(false);
						});
				}}>
                    <Form>
                        <MyTextInput name="username" type="text" label="Username" />
                        <MyTextInput name="password" type="password" label="Password" />
                        <button type="submit">Login</button>
                    </Form>
                </Formik>
                <Link to="/signup">Don't have an account? Sign up here</Link>
                <Link to="/reset-password">Forgot your password? Reset it here</Link>
		</>
	);
}
