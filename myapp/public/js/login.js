document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    await axios.post('/auth/login', {
        email,
        password
    }).then((res) => {
        window.location.href = res.data.redirectUrl;
    }).catch((error) => {
        document.getElementById('message').textContent = error.response.data.message;
    })
});