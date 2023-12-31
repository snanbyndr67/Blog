const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Post = require('../../models/Post')
const path = require('path')

router.get('/', (req, res) => {
    res.render('admin/index')
});

router.get('/categories', (req, res) => {
    Category.find({}).sort({ $natural: -1 }).then(categories => {
        res.render('admin/categories', { categories: categories })
    })
});

// get all categories from db and send to view
// New use of the Create method
router.post('/categories', (req, res) => {
    Category.create(req.body)
        .then(category => {
            res.redirect('categories');
        })
        .catch(error => {
            //Error Procedures
            console.log("Error: ", error);
        })
});

/*
router.delete('/categories/:id', (req,res) => {
    Category.remove({_id : req.params.id}).then(() => {
        res.redirect('/admin/categories')
    })
})
*/
router.delete('/categories/:id', (req, res) => {
    Category.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('/admin/categories');
        })
        .catch(error => {
            // Handle errors
            console.error("Error:", error);
        });
});

router.get('/posts', (req, res) => {
    Post.find({}).populate({ path: 'category', model: Category }).sort({ $natural: -1 }).lean().then(posts => {
        res.render('admin/posts', { posts: posts })
    }).catch(err => {
        console.error(err);
        // Hata durumunda kullanıcıya bir hata sayfası göndermek veya başka bir işlem yapmak isteyebilirsiniz.
    });
});

router.delete('/posts/:id', (req, res) => {
    Post.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('/admin/posts');
        })
        .catch(error => {
            // Handle errors
            console.error("Error:", error);
        });
});

router.get('/posts/edit/:id', (req, res) => {
    Post.findOne({_id: req.params.id}).then(post => {
        Category.find({}).then(categories => {
            res.render('admin/editpost', { post: post, categories:categories })
        })
    })
});

router.put('/posts/:id', (req, res) => {
    let post_image = req.files.post_image
    post_image.mv(path.resolve(__dirname, '../../public/img/postimages', post_image.name))
    Post.findOne({_id: req.params.id}).then(post => {
        post.title = req.body.title;
        post.content = req.body.content;
        post.date = req.body.date;
        post.category = req.body.category;
        post.post_image = `/img/postimages/${post_image.name}`;

        post.save().then(post => {
            res.redirect(`/admin/posts`)
        })
    })
})

module.exports = router