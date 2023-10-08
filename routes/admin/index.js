const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')

router.get('/', (req,res) =>{
    res.render('admin/index')
})

router.get('/categories',(req,res) => {
    Category.find({}).then(categories => {
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




module.exports = router