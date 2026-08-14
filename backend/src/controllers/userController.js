import bcrypt from "bcrypt";
import {
  createUser,
  deleteUser,
  fetchUsers,
  findUserByEmail,
  updateUSer,
} from "../models/userModel.js";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import AppError from "../Errors/AppError.js";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.validatedData;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, email, hashedPassword, "user");
    const safeUser = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    res.status(201).json({
      success: true,
      user: safeUser,
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
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
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    const safeUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    res.status(200).json({
      success: true,
      message: "successful",
      user: safeUser,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const profileUSer = (req, res) => {
  try {
    res.status(200).json({
      msg: "protected route accessed",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let { limit, page, keyword, sortBy, orderBy } = req.query;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    const offset = (page - 1) * limit;

    const allowedFields = ["id", "username", "email", "role"];
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
      SELECT id, username, email, role FROM users
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
    console.log("errrr:::", err);
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

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;
    if (loggedInUser.role != "admin" && id != loggedInUser.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authrized to update this user",
      });
    }

    const { username, email } = req.body;

    // check user exists
    const existingUser = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);

    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // check duplicate email
    if (email) {
      const emailExists = await findUserByEmail(email);

      if (emailExists && emailExists.id !== Number(id)) {
        return res.status(400).json({
          success: false,
          message: "Email already assigned to another user",
        });
      }
    }

    let fields = [];

    let values = [];

    let index = 1;

    if (username) {
      fields.push(`username = $${index}`);
      values.push(username);
      index++;
    }

    if (email) {
      fields.push(`email = $${index}`);
      values.push(email);
      index++;
    }

    values.push(id);

    const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING id, username, email, role
    `;

    const result = await updateUSer(query, values);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err.message,
    });
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
  profileUSer,
  getAllUsers,
  getUserById,
  updateUserController,
  deleteUserController,
};
