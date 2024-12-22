const rootDiv = document.getElementById('root');

function renderSignUp() {
    rootDiv.innerHTML = `
    <div class="card p-4 shadow-sm">
        <h1 class="mb-4">Sign Up</h1>
        <form id="signupForm">
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input type="text" class="form-control" id="name" placeholder="Enter your name">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Enter your email">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="password" placeholder="Enter your password">
            </div>
            <button type="button" class="btn btn-primary" onclick="handleSignUp()">Sign Up</button>
        </form>
    </div>`;
}

let userName = '';

function renderHomePage() {
    rootDiv.innerHTML = `
    <div class="card">
        <div class="welcome-container">
            <h1>Welcome, ${userName}!</h1>
            <button class="sign-out-btn mt-3" onclick="handleSignOut()">Sign Out</button>
        </div>
        <h2>Create a Post</h2>
        <textarea id="postContent" class="form-control mb-3" placeholder="What's on your mind?"></textarea>
        <button type="button" class="btn btn-primary" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList" class="list-group mt-3"></ul>
    </div>`;
}

let posts = [];

function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;

    if (postContent) {
        posts.push(postContent);
        saveToLocalStorage();
        renderPostList();
    } else {
        alert('Post content cannot be empty');
    }
}

function renderPostList() {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = ''; 
    posts.forEach((post, index) => {
        const postItem = document.createElement('li');
        postItem.className = "list-group-item d-flex justify-content-between align-items-center";
        postItem.innerHTML = `
            <span>${post}</span>
            <div>
                <button class="btn btn-sm btn-warning me-2" onclick="editPost(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deletePost(${index})">Delete</button>
            </div>`;
        postListElement.appendChild(postItem);
    });
}

function editPost(index) {
    const newContent = prompt('Edit your post below:', posts[index]);
    if (newContent !== null && newContent.trim() !== '') {
        posts[index] = newContent.trim();
        renderPostList();
    }
}

function deletePost(index) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts.splice(index, 1);
        renderPostList();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('userName', userName);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadFromLocalStorage() {
    userName = localStorage.getItem('userName') || '';
    posts = JSON.parse(localStorage.getItem('posts')) || [];
}

function handleSignUp() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (name && email && password) {
        userName = name; 
        saveToLocalStorage(); 
        renderHomePage(); 
    } else {
        alert('All fields must be filled in!');
    }
}

function handleSignOut() {
    if (confirm("Are you sure you want to sign out?")) {
        userName = '';
        posts = [];
        localStorage.clear();
        renderSignUp(); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    if (userName) {
        renderHomePage();
        renderPostList();
    } else {
        renderSignUp();
    }
});
