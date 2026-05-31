import pool from "../config/db.js";

const createBlogs = async (title, content, user_id) => {
  const query = `Insert into blogs (title, content, user_id) 
    values ($1, $2, $3) returning *`;
  const values = [title, content, user_id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateBlog = async(id, title, content)=>{
  const query = `
    SELECT
      blogs.id,
      blogs.title,
      blogs.content,
      blogs.created_at,
      blogs.user_id,
      users.username
    FROM blogs
    JOIN users
    ON blogs.user_id = users.id
    WHERE blogs.id = $1
  `;
    const result = await pool.query(query, [title, content, id]);
    return result.rows[0];
}

const getAllBlogs = async () => {
  const query = `SELECT
    blogs.id,
    blogs.title,
    blogs.content,
    blogs.user_id,
    users.username
FROM blogs
JOIN users
ON blogs.user_id = users.id
order by blogs.created_at desc;`;

  const result = await pool.query(query);
  return result.rows;
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
  const result = await pool.query(query, [blogId])

  return result.rows[0]
};

export { createBlogs, getAllBlogs, getMyBlogs, getBlogById, updateBlog };
