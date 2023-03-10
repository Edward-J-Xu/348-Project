const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const db = require("../models/index")

// Select
router.get("/", async (req, res) => {
  // const listOfPosts = await Posts.findAll();
  const [listOfPosts, filedData] = await db.pool.query(
      "select * from posts"
  )
  console.log("lists of posts: ", JSON.stringify(listOfPosts))
  res.json(listOfPosts);
});

// Select
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  // const post = await Posts.findByPk(id);
  const post = await db.pool.query(
      "select * from posts where id = (?)",
      [id]
  )
  console.log("viewing a post: ", JSON.stringify(post[0]))
  res.json(post[0][0]);
});

router.post("/", async (req, res) => {
  const post = req.body;
  // Create / Insert Posts
  console.log("creating a post:", post)
  // await Posts.create(post);
  try {
    await db.pool.query(
        "insert into posts (title, postText, username) values (?, ?, ?)",
        [post.title, post.postText, post.username]
    )
  } catch (e) {
    console.log(e)
  }

  res.json(post);
});

module.exports = router;
