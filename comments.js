// Create web server

// Import express
const express = require('express');
const app = express();

// Import body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import mongoose
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/itc-9', { useNewUrlParser: true });

// Import model
const Comment = require('./models/comment');

// Create comment
app.post('/api/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Get comments
app.get('/api/comments', (req, res) => {
    Comment.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Get comment by id
app.get('/api/comments/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Update comment
app.put('/api/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        comment: req.body.comment
    }, { new: true })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// Delete comment
app.delete('/api/comments/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

app.listen(3000);