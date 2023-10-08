const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')

router.get('/', (req,res) =>{
    res.render('admin/index')
})

router.get('/categories',(req,res) => {
    Category.find({}).sort({$natural:-1}).then(categories => {
        res.render('admin/categories', { categories: categories })
    })
})

// get all categories from db and send to view
// New use of the Create method
router.post('/categories', (req,res) => {
    Category.create(req.body)
    .then(category => {
        res.redirect('categories');
    })
    .catch(error => {
        //Error Procedures
        console.log("Error: ", error);
    })
})

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




module.exports = router