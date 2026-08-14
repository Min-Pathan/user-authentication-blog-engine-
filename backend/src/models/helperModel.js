import pool from "../config/db.js";

const getBlogByIdHelper = async (id) => {

  const query = `
    SELECT *
    FROM blogs
    WHERE id = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

export default getBlogByIdHelper