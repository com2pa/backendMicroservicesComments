const commentRouter =require('express').Router()
const User =require('../models/user')
const Comment =require('../models/comment')
const Post =require('../models/post')


// obtenemos todos comentarios

commentRouter.get('/:postId', async (request, response) => {
        const { postId } = request.params;
    // obtenemos todos los comentarios
    const comments = await Comment.find({post: postId })
    // console.log(comments)

    // damos respuesta
    return response.status(200).json(comments)
})



// crear comentarios
commentRouter.post('/:postId', async (request, response) => {
    
    const { postId } = request.params
    const {text} = request.body
    console.log(postId , text)


    const post = await Post.findById(postId)
    if (!post) {
        return response.status(404).json({ message: 'No existe el Post' })
    }
    
   
    // cremaios el post
    const newComment = new Comment({
        text,        
        post: postId
    })
    // guardamos
    await newComment.save()

    post.comments.push(newComment._id)
    // añadiendo el id de comentario en el modelo de post
    await post.save()
    // // damos respuesta
    return response.status(201).json(newComment)
})



module.exports = commentRouter;
