const express = require("express");

const postController = require("../controllers/posts");

const router = express.Router();

// POST /instagram/posts
router.get("/posts", postController.getPosts);

// GET /instagram/downloadedPost
router.post("/downloadedPost", postController.getDownloadedPost);


/// --- DELET UNDER ----

// GET /instagram/temp
router.get("/temp", (req, res, next) => {

    // res.setHeader('Content-Type', 'application/json');
    console.log(req.query.username)



    res.status(200).json({
        data: "END"
    });

});

module.exports = router;
