const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/register', (req,res) =>{
    res.render('site/register')
})

router.post('/register', (req, res) => {
    User.create(req.body)
    .then(User => {
        req.session.sessionFlash = {
            type:'alert alert-success',
            message:'User registration successful'
        }
        //Actions to take when the user is successfully created
        res.redirect('/users/login');
    })
    .catch(error => {
        //Actions to be taken in case of error
        console.error(error);
        res.status(500).send('User creation error');
    });
});

router.get('/login', (req,res) =>{
    res.render('site/login')
});

router.post('/login', (req,res) =>{
    const{email, password} = req.body;
    User.findOne({email})
    .then(user => {
        if (!user) {
            res.redirect('/users/login');
        } else {
            if (user.password === password) {
               /// USER SESİON
               req.session.userId = user._id
               res.redirect('/');
            } else {
                res.redirect('/users/login');
            }
        }
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Login error')
    });
});

router.get('/logout', (req,res) =>{
    req.session.destroy(()=> {
        res.redirect('/')
    })
});

module.exports = router