const express = require("express");
const postRouter = express.Router();
const pool = require("../db/db.js");


postRouter.get("/posts", async (req, res) => {
    console.log("in /posts route")
    const sql = `
        SELECT * FROM posts
    `;
    console.log(sql);
    
    try {
        const result = await pool.query(sql);
        res.status(200).json({
            status: "success",
            data:{
                posts: result.rows
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

postRouter.get("/posts/:id", async (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT * FROM posts
        WHERE id = $1
    `;
    const values = [id];
    try {
        const post = await pool.query(sql, values);
        const comments = await pool.query(
            `
                SELECT * FROM comments
                where post_id = $1
            `, [id]);

        res.status(200).json({
            status: "success",
            data: {
                post: post.rows[0],
                comments: comments.rows
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


postRouter.get("/comments", async (req, res) => {
    const parent_comment_id = req.query.parent_comment_id;
    
     // will return all childs of a given parent comment
    const sql = `
        SELECT * FROM comments
        WHERE parent_id = $1
    `;
    const values = [parent_comment_id];
    try{
        const comments = await pool.query(sql, values);
        const baseComment = await pool.query(
           `SELECT * FROM comments
            WHERE id = $1`,[parent_comment_id]
        );
        res.status(200).json({
            status: "success",
            data: {
                baseComment: baseComment.rows[0],
                comments: comments.rows
            }
        });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports = postRouter;