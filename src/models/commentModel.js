import pool from "../config/db.js";

const getAllComments = async()=>{
    
}

const getCommentsByBlogId = async(blogId)=>{
    const query = `
    select comments.id, comments.comment, comments.created_at,
    users.username from comments join users 
    on users.id = comments.user_id
    where comments.blog_id=$1 
    order by comments.created_at desc`
     const result = await pool.query(query, [blogId]);

  return result.rows;
}

const createComment = async(comment, user_id, blog_id)=>{
    const query =
    `insert into comments(comment, user_id, blog_id)
    values ($1, $2, $3) returning *`;
    const result = await pool.query(
        query,
        [comment, user_id, blog_id]
    )
    return result.rows[0]
}

const getCommentById = async (id) => {
    const query = `
        SELECT
            comments.id,
            comments.comment,
            comments.user_id,
            comments.blog_id,
            comments.created_at,
            users.username
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

const updateComment = async (id, comment) => {
    const query = `
        UPDATE comments
        SET comment = $1
        WHERE id = $2
        RETURNING *`;
    const result = await pool.query(query, [comment, id]);
    return result.rows[0];
};

const deleteComment = async (id) => {
    const query = `DELETE FROM comments WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

export {getAllComments, getCommentsByBlogId, createComment, getCommentById, updateComment, deleteComment};