const router = require('express').Router();
const { User, Posts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');
const currentDateTime = require('../../utils/helpers');

// GET all posts
router.get("/", (req, res) => {
    Posts.findAll({
            attributes: ["id", "title", "content", "createdAt"],
            order: [
                ["createdAt", "ASC"]
            ],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comments,
                    attributes: ["id", "comment", "post_id", "user_id", "createdAt"],
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
router.post('/', withAuth, (req, res) => {
    console.log(req.session);
    Posts.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
            // upload_date: currentDateTime,
        })
        .then(dbPostData => {
            res.json(dbPostData);
            console.log(dbPostData);
            })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// UPDATE posts


// DELETE posts




module.exports = router;