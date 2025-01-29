const commentRouter = require('express').Router();
const User = require('../models/user');
const Comment = require('../models/comment');
const Post = require('../models/post');
const { usertExtractor } = require('../middleware/auth');

// obtenemos todos comentarios

commentRouter.get('/:postId', async (request, response) => {
  const { postId } = request.params;
  // console.log(postId)
  // obtenemos todos los comentarios
  const comments = await Comment.find({ post: postId }).populate('user', 'name')
  // console.log(comments);

  // damos respuesta
  return response.status(200).json(comments);
});

// crear comentarios
commentRouter.post('/:postId', async (request, response) => {
  const { postId } = request.params;
  const { text } = request.body;
  console.log(postId, text)
  const post = await Post.findById(postId);
  
  if (!post) {
    return response.status(404).json({ message: 'No existe el Post' });
  }

  const newComment = new Comment({
    text,
    post: postId,
    user: request.user,
  });

  await newComment.save();
  post.comments.push(newComment._id);
  await post.save();

  return response.status(201).json(newComment);
});

module.exports = commentRouter;
