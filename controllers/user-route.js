const router = require('express').Router(); 
const { user, post, comment } = require('../models'); 

router.get('/', (req, res)=>{
    user.findAll({
        attributes: {exclude: ['password']}
    }).then(userData => res.json(userData))
.catch(err => {
    console.log(err); 
    res.status(500).json(err);
}); 
});

router.get('/:id', (req, res) => {
    user.findOne({
        attributes: {exclude: ['password']}, 
        where: {
            id: req.params.id
        }, 
        include: [
            {
                model: post, 
                attributes: ['id', 'post_url', 'title', 'user_id', 'content']
            },
            {
                model: comment, 
                attribute: ['id', 'comment_text', 'user_id', 'post_id'] 
            }
        ]
    }).then(userData => res.json(userData))
    .catch(err => {
        console.log(err); 
        res.status(500).json(err);
    }); 
}); 

router.post('/', (req, res) => {
    user.create({
        username: req.body.username,
        email: req.body.email, 
        password: req.body.password
    }).then(userData => {
      req.session.save(()=> {
          req.session.user_id = userData.id; 
          req.session.username = userData.username; 
          req.session.loggedIn = true; 

          res.json(userData); 
      }
      )  
    }).catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    }); 
}); 

router.post('/login', (req, res) => {
    user.findOne({
        where: {
            username: req.body.username
        }
    }).then(userData => {
        if(!userData) {
            res.status(400).json({ message: 'No user exists!'}); 
        } 
        const correctPassword = userData.checkPassword(req.body.password); 
        if(!correctPassword) {
            res.status(400).json({ message: 'Incorrect password!'});  
        }
        req.session.save(()=> {
            req.session.user_id = userData.id; 
            req.session.username = userData.username; 
            req.session.loggedIn = true; 
  
            res.json(userData); 
        }
        ); 
    }).catch(err => {
        console.log(err); 
        res.status(500).json(err); 
    }); 
}); 

router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(()=>{
            res.status(200).end(); 
        })
    } else {
        res.status(404).end(); 
    }
}); 

module.exports = router; 