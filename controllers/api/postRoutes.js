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
router.get('/:id', (req, res) => {
    Posts.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'content',
                'title',
                'createdAt'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comments,
                    attributes: ['id', 'comment', 'post_id', 'user_id', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

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
router.put('/:id', withAuth, (req, res) => {
    Posts.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        }).then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE posts
router.delete('/:id', withAuth, (req, res) => {
    Posts.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;