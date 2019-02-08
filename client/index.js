const card = post => {
    return `
    <div class="card z-depth-4">
        <div class="card-content">
            <span class="card -title">${post.title}</span>
            <p>${post.text}</p>
            <small>${new Date(post.date).toLocaleDateString()} ${new Date(post.date).toLocaleTimeString().slice(0, -3)}</small>
        </div>
        <div class="card-action">
            <button class="btn btn-small red js-remove" data-id="${post._id}">
                <i class="material-icons">delete</i>
            </button>
        </div>
    </div>
    `
};
let posts = [];
let modal;
const BASE_URL = '/api/post/';
class PostApi {
    static fetch() {
        return fetch(BASE_URL, {method: 'get'}).then(res => res.json())
    }
    static create(post) {
        return fetch(BASE_URL, {
            method: 'post',
            body: JSON.stringify(post),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json());
    }
    static remove(id) {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'delete'
        }).then(res => res.json());
    };
}
document.addEventListener('DOMContentLoaded', () => {
    PostApi.fetch().then(backendPosts => {
        posts = backendPosts.concat();
        renderPosts(posts);
    });
    modal = M.Modal.init(document.querySelector('.modal'));
    document.querySelector('#createPost').addEventListener('click', onCreatePost);
    document.querySelector('#posts').addEventListener('click', onDeletePost);
});
let renderPosts = (_posts = []) => {
    const $posts = document.querySelector('#posts');
    if(_posts.length > 0) {
        $posts.innerHTML = _posts.map(post => card(post)).join(' ');
    }
    else {
        $posts.innerHTML = `<div class="center">Постов пока нет</div>`;
    }
};
let onCreatePost = () => {
    const $title = document.querySelector('#title');
    const $text = document.querySelector('#text');
    console.log($title.value + ' first debug');
    console.log($text.value + ' first debug');
    if($title.value && $text.value) {
        console.log($title.value + ' second debug');
        console.log($text.value + ' second debug');
        let newPost = {
            title: $title.value,
            text: $text.value
        };
        // console.log(newPost.title + ' third debug');
        // console.log(newPost.text = ' third debug'); // text undefined
        PostApi.create(newPost).then(post => {
            // console.log(post.title);
            // console.log(post.text);
            posts.push(post);
            renderPosts(posts);
        }).catch(err => console.log(err));
        modal.close();
        $title.value = '';
        $text.value = '';
        M.updateTextFields();
    }
};
let onDeletePost = (event) => {
    if(event.target.classList.contains('js-remove')) {
        const decision = confirm('A you sure you want to delete this post?');
        if(decision) {
            const id = event.target.getAttribute('data-id');
            PostApi.remove(id).then(() => {
                const postIndex = posts.findIndex(post => post._id === id);
                posts.splice(postIndex, 1);
                renderPosts(posts);
            });
        }
    }
};