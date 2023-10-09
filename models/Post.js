const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    title: { type: String, required:true },
    author: { type: Schema.Types.ObjectId, ref:'users'},
    category: { type: Schema.Types.ObjectId, ref:'categories' },
    content: { type: String, required:true },
    date: { type: Date, default: Date.now },
    post_image: { type: String, required:true}
})

module.exports = mongoose.model('Post', PostSchema)