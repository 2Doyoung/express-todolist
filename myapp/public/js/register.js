document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    await axios.post('/auth/register', {
        email,
        password
    }).then((response) => {
        document.getElementById('message').textContent = response.data.message;
    }).catch((error) => {
        document.getElementById('message').textContent = error.response.data.message;
    });
});