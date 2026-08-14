import pool from "../config/db.js";

const findLike = async (userId, blogId) => {
  const query = `
    SELECT *
    FROM likes
    WHERE user_id = $1
      AND blog_id = $2
  `;

  const result = await pool.query(query, [userId, blogId]);

  return result.rows[0];
};

const createLike = async (userId, blogId) => {
  const query = `
    INSERT INTO likes (user_id, blog_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await pool.query(query, [userId, blogId]);

  return result.rows[0];
};

const deleteLike = async (userId, blogId) => {
  const query = `
    DELETE FROM likes
    WHERE user_id = $1
      AND blog_id = $2
    RETURNING *;
  `;

  const result = await pool.query(query, [userId, blogId]);

  return result.rows[0];
};

const getLikeCount = async (blogId) => {
  const query = `
    SELECT COUNT(*) AS like_count
    FROM likes
    WHERE blog_id = $1
  `;

  const result = await pool.query(query, [blogId]);

  return Number(result.rows[0].like_count);
};

const getLikeStatus = async (userId, blogId) => {
  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM likes
      WHERE user_id = $1
        AND blog_id = $2
    ) AS liked
  `;

  const result = await pool.query(query, [userId, blogId]);

  return result.rows[0].liked;
};

export {
  findLike,
  createLike,
  deleteLike,
  getLikeCount,
  getLikeStatus,
};