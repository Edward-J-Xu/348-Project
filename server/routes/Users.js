const express = require("express");
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require("bcrypt");
const db = require("../models/index")

router.post("/", async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        // Users.create({
        //     username: username,
        //     password: hash,
        // });
        console.log("hash: ", hash)
        db.pool.query(
            "insert into users (username, password) values (?, ?)",
            [username, hash]
        )
        res.json("SUCCESS");
    });
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    // Find if exists in table
    // const user = await Users.findOne({ where: { username: username } });
    const [user, fieldData] = await db.pool.query(
        "select * from users where username = (?)",
        [username]
    )
    console.log("username: ", user[0])

    if (!user) res.json({error: "User Doesn't Exist"});

    bcrypt.compare(password, user[0].password).then((match) => {
        if (!match) {
            console.log("not matched")
            res.json({error: "Wrong Username And Password Combination"});
            return
        }

        console.log("matched")
        res.json("YOU LOGGED IN!!!");
    });
});

module.exports = router;