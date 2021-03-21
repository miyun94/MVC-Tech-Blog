const router = require('express').Router(); 
const { comment } = require('../models'); 

//get the comments
router.get('/', (req, res)=> {
    comment.findAll().then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    });
});

//get comment by id 
router.get('/:id', (req, res) => {
    comment.findOne({
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: "No comment found!"});
            return; 
        }
            res.json(commentData); 
    }).catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    });
}); 

//create comment 
router.post('/', (req, res) => {
    comment.create({
        comment_text: req.body.comment_text, 
        post_id: req.body.post_id,
        user_id: req.session.user_id
    }).then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    });
}); 

//update comment by id
router.put('/:id', (req, res) => {
    comment.update({
        where: {
            id: req.params.id
        }, 
    }).then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: "No comment found!"});
            return; 
        }
            res.json(commentData); 
    }).catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    });
});

//delete specific comment by id 
router.delete('/:id', (req, res) => {
    comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: "No comment found!"});
            return; 
        }
            res.json(commentData); 
    }).catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    });
}); 

module.exports = router; 