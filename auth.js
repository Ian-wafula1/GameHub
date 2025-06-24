if (document.getElementById('signup-form')) {
    document.getElementById('signup-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.username === username)) {
            alert('User already exists!');
            return;
        }

        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Sign up successful! You can now log in.');
        window.location.href = 'login.html';
    });
}
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', username);
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password');
        }
    });
}
function logout() {
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    window.location.href = 'login.html';
}