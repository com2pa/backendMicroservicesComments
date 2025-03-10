const mongoose= require('mongoose')

const postSchema =new mongoose.Schema({
    title: String,
    content: String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
 
})

postSchema.set('toJSON',{
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const Post =mongoose.model('Post',postSchema)

module.exports = Post;