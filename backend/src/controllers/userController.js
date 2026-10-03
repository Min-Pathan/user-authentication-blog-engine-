import bcrypt from "bcrypt";
import {
  createUser,
  deleteUser,
  fetchUsers,
  findUserByEmail,
  findUserProfileById,
  incrementTokenVersion,
  updateUSer,
} from "../models/userModel.js";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import AppError from "../Errors/AppError.js";

const registerUser = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      phone,
    } = req.validatedData;

    const existingUser =
      await findUserByEmail(email);

    if (existingUser) {
      throw new AppError(
        "Email already exists",
        409,
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser = await createUser(
      username,
      email,
      hashedPassword,
      phone,
      "user",
    );

    const safeUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
    };

    res.status(201).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.validatedData;
    const user = await findUserByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
         tokenVersion: user.token_version,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone
    };
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: safeUser,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    // Bump token_version so every JWT issued before this
    // logout is rejected by authMiddleware from now on.
    await incrementTokenVersion(req.user.id);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const profileUSer = async (req, res, next) => {
  try {
    const user = await findUserProfileById(req.user.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    let { limit, page, keyword, sortBy, orderBy } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    const offset = (page - 1) * limit;

    const allowedFields = ["id", "username", "email", "phone", "role"];
    const finalSortBy = allowedFields.includes(sortBy) ? sortBy : "id";
    const sortOrder = orderBy === "desc" ? "DESC" : "ASC";

    let whereClause = "";
    const values = [];
    let valueIndex = 1;

    if (keyword) {
      whereClause = `WHERE username ILIKE $$x{valueIndex} OR email ILIKE $${valueIndex}`;
      values.push(`%${keyword}%`);
      valueIndex++;

      if (!isNaN(keyword)) {
        whereClause += ` OR id = $${valueIndex}`;
        values.push(parseInt(keyword));
        valueIndex++;
      }
    }

    const query = `
      SELECT id, username, email, phone, role FROM users
      ${whereClause}
      ORDER BY ${finalSortBy} ${sortOrder}
      LIMIT $${valueIndex} OFFSET $${valueIndex + 1}
    `;
    const result = await fetchUsers(query, [...values, limit, offset]);

    const countQuery = `SELECT COUNT(*) FROM users ${whereClause}`;
    const countResult = await fetchUsers(countQuery, values);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      total,
      page,
      limit,
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const user = result.rows[0];
    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
    return res.status(200).json({
      success: true,
      user: safeUser,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.message,
    });
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      throw new AppError("Invalid user ID", 400);
    }

    if (id !== Number(req.user.id)) {
      throw new AppError(
        "You can only update your own profile",
        403,
      );
    }

    const { username, email, phone } = req.validatedData;

    const emailOwner = await findUserByEmail(email);

    if (emailOwner && Number(emailOwner.id) !== id) {
      throw new AppError("Email is already in use", 409);
    }

    const user = await updateUSer(username, email, phone, id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    // Also handles concurrent duplicate-email submissions.
    if (error.code === "23505") {
      return next(
        new AppError("Username or email is already in use", 409),
      );
    }

    next(error);
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  profileUSer,
  getAllUsers,
  getUserById,
  updateUserController,
  deleteUserController,
};
