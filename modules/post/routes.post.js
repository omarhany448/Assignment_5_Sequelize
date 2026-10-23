
import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostsDetails,
  getPostsCommentCount,
} from "./post.controller.js";

const router = Router();

router.get("/details", getPostsDetails);
router.get("/comment-count", getPostsCommentCount);
router.post("/", createPost);
router.delete("/:postId", deletePost);

export default router;
