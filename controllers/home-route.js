//contain hompage and login page?

const { userInfo } = require('node:os');
const comment = require('../models/comment');

const router = require('express').Router(); 

//render the homepage handlebars
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'post_url', 'title','user_id','content'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        res.render('homepage', dbPostData.get({ plain: true}));
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router; 