import { Formik, Form } from 'formik';
import { MyCheckbox, MySelect, MyTextInput } from '../utils/formElements';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import vid from '../assets/video1.mp4';
import { ToastContainer, toast } from 'react-toastify';

export default function Signup() {

    const navigate = useNavigate()
	const notify = (message, ...props) => toast(message, { theme: 'dark',  ...props});

	return (
		<>
        <ToastContainer />
        <video className="fixed z-[-1] w-screen h-screen inset-0 max-w-none opacity-100 transform-none object-cover " autoPlay loop muted playsInline>
                        <source src={vid} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
        <div className='m-5 flex flex-col gap-5 max-w-[630px] w-[80%] px-8 py-5 self-center bg-[#ffffff33] text-white text-lg font-semibold backdrop-blur-[10px] rounded-3xl '>
			<h1 className='text-3xl self-center'>Create an account!</h1>
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
                    }).then(() => {
                        navigate('/login')
                    }).catch(err => notify(err.message))
                    setSubmitting(false);
				}}>
                    <Form className='flex flex-col gap-2 '>
                        <MyTextInput label='Username' name='username' type='text' placeholder='johnDoeDaGreat' />
                        <MyTextInput label='Email' name='email' type='email' placeholder='Ig5mE@example.com' />
                        <MyTextInput label='Age' name='age' type='number' placeholder='34' />
                        <MySelect label='Gender' name='gender'>
                            <option value="">Select a gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </MySelect>
                        <MyTextInput label='Password' name='password' type='text'  />
                        <MyTextInput label='Confirm Password' name='confirmPassword' type='text' />

                        <button className='my-5 border-2 border-white bg-gray-700 transition-colors rounded-3xl px-4 py-[.6rem] hover:bg-slate-900  w-60 self-center' type="submit">Sign up</button>
                    </Form>
                </Formik>
                <p className='text-[#0f1012] text-center text-xl'>Already have an account? <Link className='text-purple-900 underline' to="/login">Log in</Link></p>
		</div></>
	);
}
