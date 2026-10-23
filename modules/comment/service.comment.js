
import { Op } from "sequelize";
import { Comment } from "../../models/comment.model.js";
import { User } from "../../models/user.model.js";
import { Post } from "../../models/post.model.js";

export const createBulkComments = async (data) => {
  return await Comment.bulkCreate(data, {
    validate: true,
  });
};

export const updateComment = async (commentId, userId, content) => {
  const comment = await Comment.findByPk(commentId);

  if (!comment) {
    return { status: 404, message: "Comment not found" };
  }

  if (Number(comment.userId) !== Number(userId)) {
    return {
      status: 403,
      message: "You are not the owner of this comment",
    };
  }

  comment.content = content;
  await comment.save();

  return { status: 200, comment };
};

export const findOrCreateComment = async (data) => {
  return await Comment.findOrCreate({
    where: {
      postId: data.postId,
      userId: data.userId,
      content: data.content,
    },
    defaults: {
      postId: data.postId,
      userId: data.userId,
      content: data.content,
    },
  });
};

export const searchComments = async (word) => {
  const where = {
    content: {
      [Op.like]: `%${word}%`,
    },
  };

  const comments = await Comment.findAll({ where });
  const count = await Comment.count({ where });

  return { comments, count };
};

export const getNewestComments = async (postId) => {
  return await Comment.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
};

export const getCommentDetails = async (id) => {
  return await Comment.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "name", "email"],
      },
      {
        model: Post,
        attributes: ["id", "title", "content"],
      },
    ],
  });
};
