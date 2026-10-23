
import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import { Comment } from "../../models/comment.model.js";
import { sequelize } from "../../config/database.js";

export const createPost = async (data) => {
  const post = new Post(data);
  await post.save();
  return post;
};

export const deletePost = async (postId, userId) => {
  const post = await Post.findByPk(postId);

  if (!post) {
    return { status: 404, message: "Post not found" };
  }

  if (Number(post.userId) !== Number(userId)) {
    return { status: 403, message: "You are not the owner of this post" };
  }

  await post.destroy();

  return { status: 200, message: "Post deleted successfully" };
};

export const getPostsDetails = async () => {
  return await Post.findAll({
    attributes: ["id", "title"],
    include: [
      {
        model: User,
        attributes: ["id", "name"],
      },
      {
        model: Comment,
        attributes: ["id", "content"],
      },
    ],
  });
};

export const getPostsCommentCount = async () => {
  return await Post.findAll({
    attributes: [
      "id",
      "title",
      [
        sequelize.fn("COUNT", sequelize.col("Comments.id")),
        "commentsCount",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [],
      },
    ],
    group: ["Post.id"],
  });
};
