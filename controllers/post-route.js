const router = require('express').Router();
const { post, user, comment } = require('../models'); 

//get all posts 
router.get('/', (req, res) => {
    post.findAll({
        attributes: ['id', 'post_url', 'title', 'user_id', 'content'],
        include: [
            {
                model: comment, 
                attribute: ['id', 'comment_text', 'user_id', 'post_id'], 
                include: {
                    model: user, 
                    attributes: ['username']
                }
            }, 
            {
                model: user, 
                attributes: ['username']
            }
        ]
    }).then(postData => res.json(postData))
    .catch(err=>{
        console.log(err); 
        res.status(500).json(err);
    });
});

//get single post by id 
router.get('/:id', (req, res) => {
    post.findOne({
        where: {
            id: req.params.id
        }, 
        attributes: ['id', 'post_url', 'title', 'user_id', 'content'],
        include: [
            {
                model: comment, 
                attribute: ['id', 'comment_text', 'user_id', 'post_id'], 
                include: {
                    model: user, 
                    attributes: ['username']
                }
            }, 
            {
                model: user, 
                attributes: ['username']
            }
        ]
    }).then(postData => {
        if(!postData){
            res.status(400).json({ message: "No post found with this ID"});
        }
        res.json(postData);
    }).catch(err=>{
        console.log(err); 
        res.status(500).json(err);
    });
});

//create post 
router.post('/', (req, res)=> {
    post.create({
        title: req.body.title, 
        content: req.body.content, 
        user_id: req.session.user_id
    }).then(postData => res.json(postData))
    .catch(err=>{
        console.log(err); 
        res.status(500).json(err);
    });
});

//update single specific post by id
router.put('/:id', (req, res) => {
    post.update(
        {
            title: req.body.title
        }, 
        {
            where: {
                id: req.params.id
            }
        }
    ).then(postData => {
        if(!postData){
            res.status(400).json({ message: "No post found with this ID"});
        }
        res.json(postData);
    }).catch(err=>{
        console.log(err); 
        res.status(500).json(err);
    });
}); 

//delete single post by id
router.put('/:id', (req, res) => {
    post.destroy({
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if(!postData){
            res.status(400).json({ message: "No post found with this ID"});
        }
        res.json(postData);
    }).catch(err=>{
        console.log(err); 
        res.status(500).json(err);
    });
}); 

module.exports = router; 