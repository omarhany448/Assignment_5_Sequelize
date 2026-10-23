
import { Router } from "express";
import {
  createBulkComments,
  updateComment,
  findOrCreateComment,
  searchComments,
  getNewestComments,
  getCommentDetails,
} from "./comment.controller.js";

const router = Router();

router.post("/find-or-create", findOrCreateComment);
router.get("/search", searchComments);
router.get("/newest/:postId", getNewestComments);
router.get("/details/:id", getCommentDetails);
router.post("/", createBulkComments);
router.patch("/:commentId", updateComment);

export default router;
