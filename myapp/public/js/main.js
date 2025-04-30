const todoList = document.getElementById('todoList');

document.addEventListener('DOMContentLoaded', async () => {
    await axios.post('/auth/loginCheck', { 
        withCredentials: true 
    }).then((res) => {
        const hTag = document.getElementById('hTag');

        if(res.data.isLoggedIn) {
            const authButton = document.getElementById('authButton');

            authButton.style.display = 'none';
            hTag.textContent = `📝 TO-DO App ${res.data.user.email}님 환영합니다`;
        }

        if(!res.data.isLoggedIn) {
            const logoutDiv = document.getElementById('logoutDiv');
            const todoItemDiv = document.getElementById('todoItemDiv');

            logoutDiv.style.display = 'none';
            todoItemDiv.style.display = 'none';
            hTag.textContent = `📝 TO-DO App 환영합니다`;
        }
    });

    await axios.get('/todo/list')
    .then((res) => {
        const todos = res.data.todos;
        
        todos.forEach((todo) => {
            const li = document.createElement('li');
            li.textContent = todo.todo_item;
            todoList.appendChild(li);
        })
    });
})

document.getElementById('logoutButton').addEventListener('click', async (e) => {
    e.preventDefault();

    await axios.post('/auth/logout')
    .then((res) => {
        window.location.href = res.data.redirectUrl;
    })
})

document.getElementById('addTodo').addEventListener('click', async (e) => {
    e.preventDefault();

    const li = document.createElement('li');
    const todoItem = document.getElementById('todoItem').value;
    li.textContent = todoItem;
    todoList.append(li);

    await axios.post('/todo/add', {
        todoItem
    }, { withCredentials: true })
    .then((res) => {

    }).catch((error) => {
        document.getElementById('message').textContent = error.response.data.message;
    })
})