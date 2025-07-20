import db from "../db/db.js";
import bcrypt from "bcryptjs";

export const addUser = async (user) => {
  // console.log("User model loaded");
  // console.log("Adding user model:", user);
  // return;
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = {
    ...user,
    password: hashedPassword,
  };
  // return newUser;
  // const [id] = await db("users").insert(newUser).returning("id");
  const addedUser = await db("users").insert(newUser).returning("id");
  const { password, confirmPassword, ...safeUserInfo } = newUser;
  // return { id: addedUser, ...newUser };
  return {...addedUser[0], ...safeUserInfo};
};

export const verifyDuplicateUser = async (email) => {
  const user = await db("users").where({ email }).first();
  return !!user;
}

export const getUser = async ({ email, password }) => {
  // console.log("getUser called model with email:", email);
  // const user = await db("users").where({ email }).first();
  const user = await db("users").select("id", "firstName", "lastName", "email", "password").where({ email }).first();
  // console.log("User found in model :", user);
  // return user;
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    // throw new Error("Invalid password");
    throw new Error("Invalid email or password");
  }
  const {
    password: _password,
    // created_at: _createdAt,
    // updated_at: _updatedAt,
    // acceptTerms: _acceptTerms,
    ...safeUser
  } = user;

  // console.log("Safe user info:", safeUser);
  // const { password: _, ...safeUserInfo } = user;
  return safeUser;

};

export const updateUser = async (id, updatedData) => {
  return await db("users").where({ id }).update(updatedData);
};

export const getUsers = async (email) => {
  return await db("users").select("id", "firstName", "lastName", "email", "passwordRecoveryToken").where({ email }).first();
};

export const deleteUser = async (id) => {
  return await db("users").where({ id }).del();
};

// export default {
//   addUser,
// };
