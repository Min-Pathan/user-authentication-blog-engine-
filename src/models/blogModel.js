import pool from "../config/db.js";

const createBlogs = async (title, content, user_id) => {
  const query = `Insert into blogs (title, content, user_id) 
    values ($1, $2, $3) returning *`;
  const values = [title, content, user_id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateBlog = async (id, title, content) => {
  const query = `
    UPDATE blogs
    SET
      title = $1,
      content = $2
    WHERE id = $3
    RETURNING *;
  `;

  const result = await pool.query(query, [title, content, id]);

  return result.rows[0];
};

const getAllBlogs = async (limit, offset, keyword) => {
  let query = `
    SELECT
      blogs.id,
      blogs.title,
      blogs.content,
      blogs.user_id,
      users.username
    FROM blogs
    JOIN users
    ON blogs.user_id = users.id
  `;

  const values = [];
  if(keyword){

    query += `where blogs.title ILIKE $1 OR blogs.content ILIKE $1 `;
  
    values.push(`%${keyword}%`);
  
    query += `order by blogs.created_at desc limit $2 offset $3`;
  
    values.push(limit, offset);
  }
  else {

    query += `
      ORDER BY blogs.created_at DESC
      LIMIT $1
      OFFSET $2
    `;

    values.push(limit, offset);
  }

  const result = await pool.query(query, [limit, offset]);

  return result.rows;
};

const getBlogsCount = async () => {
  const result = await pool.query(`SELECT COUNT(*) FROM blogs`);

  return parseInt(result.rows[0].count);
};

const getMyBlogs = async (userId) => {
  const query = `SELECT
    blogs.id,
    blogs.title,
    blogs.content,
    blogs.user_id,
    users.username
FROM blogs
JOIN users
ON blogs.user_id = users.id where blogs.user_id =$1
order by blogs.created_at desc;`;

  const result = await pool.query(query, [userId]);
  return result.rows;
};

const getBlogById = async (blogId) => {
  const query = `select blogs.id, blogs.title, blogs.content, blogs.created_at, users.username, users.email
  from blogs join users on blogs.user_id = users.id where blogs.id = $1`;
  const result = await pool.query(query, [blogId]);

  return result.rows[0];
};

const deleteBlog = async (blogId) => {
  const query = `delete from blogs where blogs.id=$1`;
  const result = await pool.query(query, [blogId]);

  return (await result).rows[0];
};

export {
  createBlogs,
  getAllBlogs,
  getBlogsCount,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
