const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for comments (replace this with a database in a real-world scenario)
const comments = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const newComment = req.body.comment;
    comments.push(newComment);
    res.json({ message: 'Comment added successfully' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
