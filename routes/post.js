const router = require('express').Router();
const { promise } = require('bcrypt/promises');
const Post = require('../models/Post');

// create a post
router.post('/', async (req, res) => {
  // use Model Post
  const newPost = await new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('your post has been updated');
    } else {
      res.status(403).json('you can only updata your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json('your post has been deleted');
    } else {
      res.status(403).json('you can only deleted your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// like and dislike post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('post has been liked');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('post has been disliked');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// get a post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get timeline a posts

router.get('/timeline/all', async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPost = await Post.find({ userId: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPost.concat(...friendPost));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
