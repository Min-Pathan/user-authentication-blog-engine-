import pool from "../config/db.js";

const findUserByEmail = async(email)=>{
    const query = 
    `select * from users where email =$1`;

    const result = await pool.query(query, [email]);
    return result.rows[0];
}

const createUser = async (username, email, password, role) => {
  const query = `
    INSERT INTO users (username, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [username, email, password, role];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export { createUser, findUserByEmail };