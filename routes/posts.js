const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const path = require('path')
const Category = require('../models/Category')
const authorModel = require('../models/user');
const UserModel = require('../models/user');



router.get('/new', (req, res) => {
    if (!req.session.userId) {
        res.redirect('users/login')
    }
    Category.find({}).then(categories => {
        res.render('site/addpost', { categories: categories })
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id).populate({ path: 'author', model: authorModel }).lean().then(post => {
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
            Post.find({}).populate({ path: 'author', model: UserModel }).sort({ $natural: -1 }).lean().then(posts => {
                res.render('site/post', { post: post, categories: categories, posts: posts })
            })
        })
    })
})

router.post('/test', (req, res) => {
    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname, '../public/img/postimages', post_image.name))

    Post.create({
        ...req.body,
        post_image: `/img/postimages/${post_image.name}`,
        author: req.session.userId
    },)

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: "Your post has been created"
    }


    res.redirect('/blog')
})

module.exports = router