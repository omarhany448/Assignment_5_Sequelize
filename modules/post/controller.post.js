
import * as postService from "./post.service.js";

export const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((e) => e.message),
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "userId is required",
      });
    }

    const result = await postService.deletePost(
      req.params.postId,
      userId
    );

    return res.status(result.status).json({
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getPostsDetails = async (req, res) => {
  try {
    const posts = await postService.getPostsDetails();

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPostsCommentCount = async (req, res) => {
  try {
    const posts = await postService.getPostsCommentCount();

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
