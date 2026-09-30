import pool from "../config/db.js";

const findUserByEmail = async (email) => {
  const query = `select * from users where email =$1`;

  const result = await pool.query(query, [email]);
  return result.rows[0];
};

const createUser = async (username, email, password, phone, role) => {
  const query = `
    INSERT INTO users (username, email, password, phone, role)
    VALUES ($1, $2, $3, $4 , $5)
    RETURNING *;
  `;

  const values = [username, email, password, phone, role];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const fetchUsers = async (query, values) => {
  return await pool.query(query, values);
};

const updateUSer = async (username, email, phone, id) => {
  const query = `
    UPDATE users
    SET username = $1 or
        email = $2 or phone = $3
    WHERE id = $4
    RETURNING id, username, email, phone, role
  `;

  const result = await pool.query(query, [username, email, phone, id]);

  return result.rows[0];
};

const deleteUser = async(id)=>{
  const query = `delete from users where id=$1`;
  const result = await pool.query(query, [id]);
  return result.rows[0]
}

const savePasswordResetToken = async(userId, tokenHash, expiresAt)=>{
  await pool.query(
    `update users set password_reset_token_hash =$1, password_reset_expires_at =$2
    where id=$3`, 
    [tokenHash, expiresAt, userId]
  )
} 

const clearPasswordResetToken = async (
  userId,
  tokenHash,
) => {
  await pool.query(
    `
      UPDATE users
      SET password_reset_token_hash = NULL,
          password_reset_expires_at = NULL
      WHERE id = $1
        AND password_reset_token_hash = $2
    `,
    [userId, tokenHash],
  );
};

const resetPasswordByToken = async (
  tokenHash,
  hashedPassword,
) => {
  const result = await pool.query(
    `
      UPDATE users
      SET password = $1,
          password_reset_token_hash = NULL,
          password_reset_expires_at = NULL,
          token_version = token_version + 1
      WHERE password_reset_token_hash = $2
        AND password_reset_expires_at > NOW()
      RETURNING id
    `,
    [hashedPassword, tokenHash],
  );

  return result.rows[0];
};

const findUserAuthById = async (id) => {
  const result = await pool.query(
    `
      SELECT id, role, token_version
      FROM users
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

export { createUser, findUserByEmail, fetchUsers, updateUSer, deleteUser, savePasswordResetToken, resetPasswordByToken, clearPasswordResetToken,findUserAuthById };