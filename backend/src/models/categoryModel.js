import pool from "../config/db.js";


export const createCategory = async (name) => {
  const query = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING *
  `;

  const result = await pool.query(query, [name]);

  return result.rows[0];
};

export const getAllCategories = async () => {
  const query = `
    SELECT *
    FROM categories
    ORDER BY name ASC
  `;

  const result = await pool.query(query);

  return result.rows;
};