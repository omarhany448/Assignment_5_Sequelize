
import { User } from "../../models/user.model.js";

export const signup = async (data) => {
  const existingUser = await User.findOne({
    where: { email: data.email },
  });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.status = 409;
    throw error;
  }

  const user = User.build(data);
  await user.save();

  return user;
};

export const upsertUser = async (id, data) => {
  const [user, created] = await User.upsert(
    { ...data, id: Number(id) },
    {
      validate: false,
      returning: true,
    }
  );

  return { user, created };
};

export const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
  });
};

export const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["role"] },
  });
};
