document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const commentInput = document.getElementById('comment-input');
        const userName = document.getElementById('comment-name');
        const commentText = commentInput.value;

        if (commentText.trim() !== '') {
            // addIcon('fa-user');
            addComment(commentText);
            commentInput.value = '';
            userName.value = '';
            // Send the comment to the server
            sendCommentToServer(commentText);
        }
    });

    // Fetch comments from the server on page load
    fetchCommentsFromServer();
});

// function addIcon(iconClass){
//     const commentsList = document.getElementById('comments-list');

//     commentsList.innerHTML = '<i class="fas ' + iconClass + '"></i>';
// }

function change(count){
    var image = document.getElementsByClassName('heart');
    var counting = document.getElementsByClassName('counting');
count++;

    image.addEventListener('click',function(){
        counting.value = count;
    });
}

function addComment(commentText) {
    const commentsList = document.getElementById('comments-list');
    const userName = document.getElementById('comment-name');
    const userName_value = document.createElement('li');
    userName_value.className='name';
    const commentElement = document.createElement('li');
    commentElement.className = 'comment';

    // const userName_value = document.createElement('li');
    // userName_value.className = 'name';
    // userName_value.textContent = userName.value;
    var count = 0;
    var x = document.createElement("IMG");
x.className = "comment-image";
  x.setAttribute("src", "images/test-3.jpg");
  x.setAttribute("alt", "The Pulpit Rock");
    userName_value.style.display = "inline";
    

    var y = document.createElement("IMG");
    y.className = "heart";
    y.setAttribute("src","images/heart.png");
    y.setAttribute("alt","Heart");
    commentElement.textContent = commentText

    const top = document.createElement('p');
    top.className = 'top';
    top.textContent = 'Top Comment';
    top.style.display = 'inline';



    commentsList.appendChild(x);
    commentsList.appendChild(userName_value);
    commentsList.appendChild(top);
    commentsList.appendChild(commentElement);
    commentsList.appendChild(y);
    commentsList.appendChild();
}

function sendCommentToServer(commentText) {
    fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: commentText }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function fetchCommentsFromServer() {
    fetch('/comments')
    .then(response => response.json())
    .then(data => {
        data.forEach(comment => addComment(comment));
    })
    .catch(error => console.error('Error:', error));
}
