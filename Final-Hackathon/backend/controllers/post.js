import Post from "../models/post.js";

const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user.id;

    const post = new Post({ content, author: user });
    await post.save();
    res.status(201).json({ message: "Post Created", ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};

const getPosts = async (req, res) => {
  const { user } = req.query;

  try {
    let query = {};
    if (user) query.author = user;

    const posts = await Post.find(query)
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    if (!post)
      return res.status(404).json({ message: "Post not found", ok: false });

    const userId = req.user.id;

    if (post.likes.includes(userId))
      return res
        .status(409)
        .json({ message: "Post already liked!!!", ok: false });

    post.likes.push(userId);

    await post.save();
    res.status(200).json({ message: "Post Liked!!!", ok: true, data: post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", ok: false });
  }
};

export { createPost, getPosts, likePost };
