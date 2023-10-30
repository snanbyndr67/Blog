const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')
const UserModel = require('../models/user');

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

router.get('/blog', (req, res) => {

    const postPerPage = 10 // Sayfada gösterilecek post sayısı
    const page = req.query.page || 1

    Post.find({})
        .populate({ path: 'author', model: UserModel })
        .sort({ $natural: -1 })
        .lean() 
        .skip((postPerPage * page) - postPerPage)
        .limit(postPerPage)
        .then(posts => {
            Post.countDocuments().then(postCount => {
                Category.aggregate([
                    {
                        $lookup: {
                            from: "posts",
                            localField: "_id",
                            foreignField: "category",
                            as: "posts"
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            num_of_posts: { $size: "$posts" }
                        }
                    }
                ])
                    .then(categories => {
                        res.render('site/blog', { 
                            posts: posts, 
                            categories: categories,
                            current: parseInt(page),
                            pages: Math.ceil(postCount/postPerPage)
                        });
                    })

            })
           

                .catch(err => {
                    console.error(err);
                    res.render('error-page'); // Hata sayfasına yönlendirme
                });
        })
        .catch(err => {
            console.error(err);
            res.render('error-page'); // Hata sayfasına yönlendirme
        });

});

router.get('/contact', (req,res) =>{
    res.render('site/contact')
})


module.exports = router