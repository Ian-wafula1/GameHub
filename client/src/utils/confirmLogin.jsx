import axios from 'axios';

export default async function confirmLogin() {
	if (!localStorage.getItem('token') || localStorage.getItem('token') == undefined) {
		return false;
	} else {
		console.log('ext somehow reached');
		axios.get('/api/check_login', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((res) => res.status == 200);
	}
}
