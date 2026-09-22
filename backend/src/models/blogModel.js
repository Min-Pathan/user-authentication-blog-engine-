import pool from "../config/db.js";

const createBlogs = async (title, content, user_id, mediaUrl, mediaType, mediaPublicId, category_id) => {
  const query = `Insert into blogs (title, content, user_id,  media_url, media_type, media_public_id, category_id) 
    values ($1, $2, $3, $4, $5, $6, $7) returning *`;
  const values = [title, content, user_id, mediaUrl, mediaType, mediaPublicId, category_id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateBlog = async (
  id,
  title,
  content,
  mediaUrl,
  mediaType,
  mediaPublicId,
  categoryId
) => {
  const query = `
    UPDATE blogs
    SET
      title = $1,
      content = $2,
      media_url = $3,
      media_type = $4,
      media_public_id = $5,
      category_id = $6
    WHERE id = $7
    RETURNING *;
  `;

  const result = await pool.query(query, [
    title,
    content,
    mediaUrl,
    mediaType,
    mediaPublicId,
    categoryId,
    id,
  ]);

  return result.rows[0];
};

const getAllBlogs = async (limit, offset, keyword, categoryId) => {
  const conditions = [];
  const values = []
  let valueIndex = 1;

  if (keyword) {
    conditions.push(`
      (
        blogs.title ILIKE $${valueIndex}
        OR blogs.content ILIKE $${valueIndex}
        OR users.username ILIKE $${valueIndex}
      )
    `);

    values.push(`%${keyword}%`);
    valueIndex++;
  }

  if (categoryId) {
    conditions.push(
      `blogs.category_id = $${valueIndex}`,
    );

    values.push(categoryId);
    valueIndex++;
  }

  const whereClause = conditions.length > 0 ? `Where ${conditions.join(" AND")}` : ''

  const query = `
  SELECT
    blogs.id,
    blogs.title,
    blogs.content,
    blogs.user_id,
    blogs.media_url,
    blogs.media_type,
    blogs.media_public_id,
    blogs.category_id,
    blogs.created_at,
    users.username,
     categories.name AS category,
    COUNT(DISTINCT likes.id) AS like_count,
    COUNT(DISTINCT comments.id) AS comment_count
  FROM blogs
  JOIN users
    ON blogs.user_id = users.id
  LEFT JOIN categories
    ON blogs.category_id = categories.id
  LEFT JOIN likes
    ON blogs.id = likes.blog_id
  LEFT JOIN comments
    ON blogs.id = comments.blog_id
  ${whereClause}
  GROUP BY blogs.id, users.username,  categories.id,
      categories.name
  ORDER BY blogs.created_at DESC
  LIMIT $${valueIndex}
  OFFSET $${valueIndex + 1}
`;

  values.push(limit, offset);

  const result = await pool.query(query, values);

  return result.rows.map((blog) => ({
    ...blog,
    like_count: Number(blog.like_count),
    comment_count: Number(blog.comment_count)
  }));
};

const getBlogsCount = async (
  keyword,
  categoryId,
) => {
  const conditions = [];
  const values = [];

  let valueIndex = 1;

  if (keyword) {
    conditions.push(`
      (
        blogs.title ILIKE $${valueIndex}
        OR blogs.content ILIKE $${valueIndex}
        OR users.username ILIKE $${valueIndex}
      )
    `);

    values.push(`%${keyword}%`);
    valueIndex++;
  }

  if (categoryId) {
    conditions.push(
      `blogs.category_id = $${valueIndex}`,
    );

    values.push(categoryId);
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  const query = `
    SELECT COUNT(*)

    FROM blogs

    JOIN users
      ON blogs.user_id = users.id

    ${whereClause}
  `;

  const result =
    await pool.query(
      query,
      values,
    );

  return Number(
    result.rows[0].count,
  );
};

const getMyBlogs = async (userId, limit, offset) => {
  const query = `
    SELECT
      blogs.id,
      blogs.title,
      blogs.content,
      blogs.user_id,
      blogs.category_id,
      blogs.created_at,
      blogs.media_url,
      blogs.media_type,
      users.username,
      categories.name AS category,
      COUNT(DISTINCT likes.id) AS like_count,
      COUNT(DISTINCT comments.id) AS comment_count
    FROM blogs
    JOIN users
      ON users.id = blogs.user_id
    LEFT JOIN categories
      ON categories.id = blogs.category_id
    LEFT JOIN likes
      ON likes.blog_id = blogs.id
    LEFT JOIN comments
      ON comments.blog_id = blogs.id
    WHERE blogs.user_id = $1
    GROUP BY
      blogs.id,
      users.username,
      categories.name
    ORDER BY blogs.created_at DESC, blogs.id DESC
    LIMIT $2 OFFSET $3
  `;

  const result = await pool.query(query, [
    userId,
    limit,
    offset,
  ]);

  return result.rows.map((blog) => ({
    ...blog,
    like_count: Number(blog.like_count),
    comment_count: Number(blog.comment_count),
  }));
};

const getMyBlogsCount = async (userId) => {
  const result = await pool.query(
    `SELECT COUNT(*) AS total
     FROM blogs
     WHERE user_id = $1`,
    [userId],
  );

  return Number(result.rows[0].total);
};

const getBlogById = async (blogId) => {
  const query = `
    SELECT
      blogs.id,
      blogs.title,
      blogs.content,
      blogs.created_at,
      blogs.user_id,
      blogs.category_id,
      blogs.media_url,
      blogs.media_public_id,
      blogs.media_type,

      users.username,
      users.email,

      categories.name AS category,

      COUNT(DISTINCT likes.id) AS like_count,
      COUNT(DISTINCT comments.id) AS comment_count

    FROM blogs

    JOIN users
      ON blogs.user_id = users.id

    LEFT JOIN categories
      ON blogs.category_id = categories.id

    LEFT JOIN likes
      ON blogs.id = likes.blog_id

    LEFT JOIN comments
      ON blogs.id = comments.blog_id

    WHERE blogs.id = $1

    GROUP BY
      blogs.id,
      users.id,
      categories.id,
      categories.name
  `;

  const result =
    await pool.query(
      query,
      [blogId],
    );

  if (!result.rows[0]) {
    return null;
  }

  return {
    ...result.rows[0],

    like_count: Number(
      result.rows[0].like_count,
    ),

    comment_count: Number(
      result.rows[0].comment_count,
    ),
  };
};

const deleteBlog = async (id) => {
  const query = `
    DELETE FROM blogs
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};
export {
  createBlogs,
  getAllBlogs,
  getBlogsCount,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getMyBlogsCount
};
