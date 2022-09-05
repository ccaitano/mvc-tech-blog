const router = require('express').Router();
const { User, Posts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
router.get("/", (req, res) => {
    Posts.findAll({
            attributes: ["id", "title", "content", "upload_date"],
            order: [
                ["upload_date", "ASC"]
            ],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comments,
                    attributes: ["id", "comment", "comment_date", "post_id", "user_id"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET a single post


// CREATE posts


// UPDATE posts


// DELETE posts




module.exports = router;