const router = require('express').Router();
const sequelize = require('../config/connection'); 
const { post, user, comment } = require('../models'); 

//get all posts 
router.get('/', (req, res) => {
    post.findAll({
        attributes: ['id', 'title', 'user_id', 'content'],
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
