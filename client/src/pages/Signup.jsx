import { Formik, Form } from 'formik';
import { MyCheckbox, MySelect, MyTextInput } from '../utils/formElements';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

    const navigate = useNavigate()
	return (
		<>
			<h1 class="text-2xl font-bold text-center text-gray-800">Create an account!</h1>
			<Formik
				initialValues={{
					username: '',
					email: '',
					age: '',
					gender: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={Yup.object({
					username: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
					email: Yup.string().email('Invalid email address').required('Required'),
					age: Yup.number().max(120, 'Must be 120 years or less').positive('Age should be positive').required('Required'),
                    gender: Yup.string().oneOf(['M', 'F'], 'Invalid gender').required('Required'),
                    password: Yup.string().min(8, 'Must be 8 characters or more').required('Required'),
                    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					axios.post(`/api/signup`, {
                        username: values.username,
                        email: values.email,
                        age: values.age,
                        gender: values.gender,
                        password: values.password,
                    }).then(res => {
                        console.log(res)
                        navigate('/login')
                    }).catch(err => console.log(err))
                    setSubmitting(false);
                    // axios.get('/api/users').then(res=> console.log(res))
				}}>
                    <Form class="bg-gray-100 min-h-screen flex items-center justify-center">
                        <MyTextInput label='Username' name='username' type='text' placeholder='johnDoeDaGreat' class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400">
 />
                        <MyTextInput label='Email' name='email' type='email' placeholder='Ig5mE@example.com' class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"

    />
                        <MyTextInput label='Age' name='age' type='number' placeholder='34' />
                        <MySelect label='Gender' name='gender'>
                            <option value="">Select a gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </MySelect>
                        <MyTextInput label='Password' name='password' type='text' class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400">
 />
                        <MyTextInput label='Confirm Password' name='confirmPassword' type='text'class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
 />

                        <button type="submit"class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition">Submit</button>
                    </Form>
                </Formik>
                <Link class="text-center text-sm text-gray-600"to="/login">Already have an account? Log in here</Link>
		</>
	);
}
