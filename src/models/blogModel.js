import pool from "../config/db.js";

const createBlogs = async(title, content, user_id)=>{
    const query = `Insert into blogs (title, content, user_id) 
    values ($1, $2, $3) returning *`;
    const values =[title, content, user_id]

    const result = await pool.query(query, values);
    return result.rows[0]
}

export {createBlogs}