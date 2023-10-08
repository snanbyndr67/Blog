const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')

router.get('/', (req,res) =>{
    console.log(req.session)
    res.render('site/index')
})

/*
router.get('/admin', (req,res) =>{
    res.render('admin/index')
})
*/



// router.get('/blog',(req,res) =>{

//     Post.find({}).lean().then(posts => {
//         res.render('site/blog', {posts:posts})
//     })
// })

router.get('/blog', (req,res) =>{
    Post.find({}).sort({$natural:-1}).lean().then(posts => {
        Category.find({}).then(categories => {
        res.render('site/blog', {posts: posts, categories: categories})
        })
    }).catch(err => {
        console.error(err);
        // Hata durumunda kullanıcıya bir hata sayfası göndermek veya başka bir işlem yapmak isteyebilirsiniz.
    });
});

router.get('/contact', (req,res) =>{
    res.render('site/contact')
})


module.exports = router