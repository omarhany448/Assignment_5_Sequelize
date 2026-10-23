
import * as commentService from "./comment.service.js";

export const createBulkComments = async (req, res) => {
  try {
    const data = Array.isArray(req.body)
      ? req.body
      : req.body.comments;

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        message: "Request body must contain a non-empty comments array",
      });
    }

    const comments = await commentService.createBulkComments(data);

    return res.status(201).json({
      message: "Comments created successfully",
      count: comments.length,
      comments,
    });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeForeignKeyConstraintError"
    ) {
      return res.status(400).json({
        message: "Invalid comment data",
        errors: error.errors?.map((e) => e.message) ?? [error.message],
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (userId === undefined || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({
        message: "userId and content are required",
      });
    }

    const result = await commentService.updateComment(
      req.params.commentId,
      userId,
      content
    );

    if (result.status !== 200) {
      return res.status(result.status).json({
        message: result.message,
      });
    }

    return res.status(200).json({
      message: "Comment updated successfully",
      comment: result.comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const findOrCreateComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    if (
      postId === undefined ||
      userId === undefined ||
      typeof content !== "string" ||
      !content.trim()
    ) {
      return res.status(400).json({
        message: "postId, userId and content are required",
      });
    }

    const [comment, created] =
      await commentService.findOrCreateComment({
        postId,
        userId,
        content,
      });

    return res.status(created ? 201 : 200).json({
      message: created
        ? "Comment created successfully"
        : "Comment already exists",
      created,
      comment,
    });
  } catch (error) {
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({
        message: "Invalid postId or userId",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const searchComments = async (req, res) => {
  try {
    const { word } = req.query;

    if (!word || !word.trim()) {
      return res.status(400).json({
        message: "word query parameter is required",
      });
    }

    const result = await commentService.searchComments(word);

    return res.status(200).json({
      count: result.count,
      comments: result.comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getNewestComments = async (req, res) => {
  try {
    const comments = await commentService.getNewestComments(
      req.params.postId
    );

    return res.status(200).json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getCommentDetails = async (req, res) => {
  try {
    const comment = await commentService.getCommentDetails(
      req.params.id
    );

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
