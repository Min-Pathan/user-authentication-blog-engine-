import pool from "../config/db.js";

const findUserByEmail = async (email) => {
  const query = `select * from users where email =$1`;

  const result = await pool.query(query, [email]);
  return result.rows[0];
};

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

const fetchUsers = async (query, values) => {
  return await pool.query(query, values);
};

const updateUSer = async (username, email, id) => {
  const query = `
    UPDATE users
    SET username = $1 or0
        email = $2
    WHERE id = $3
    RETURNING id, username, email, role
  `;

  const result = await pool.query(query, [username, email, id]);

  return result.rows[0];
};

const deleteUser = async(id)=>{
  const query = `delete from users where id=$1`;
  const result = await pool.query(query, [id]);
  return result.rows[0]
}
export { createUser, findUserByEmail, fetchUsers, updateUSer, deleteUser };
