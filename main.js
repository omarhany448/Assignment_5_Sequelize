
import express from "express";
import { sequelize } from "./config/database.js";
import { User } from "./models/user.model.js";
import { Post } from "./models/post.model.js";
import { Comment } from "./models/comment.model.js";
import userRoutes from "./modules/user/user.routes.js";
import postRoutes from "./modules/post/post.routes.js";
import commentRoutes from "./modules/comment/comment.routes.js";

User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "userId",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    await sequelize.sync();
    console.log("All tables created successfully");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Database error:", error);
  }
}

main();
