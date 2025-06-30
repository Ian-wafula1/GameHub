import axios from 'axios';

export default async function confirmLogin() {
	if (!localStorage.getItem('token') || localStorage.getItem('token') == undefined) {
		return false;
	} else {
		// axios.get('/api/check_login', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((res) => res.status == 200);
		let res = await axios.get('/api/check_login', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
		return res.status == 200;
	}
}
