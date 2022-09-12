const router = require('express').Router();
const { User, Posts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

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
    // try{
    //     const dbPostData = Posts.findByPk(req.params.id, {
    //             attributes: ['id',
    //                 'content',
    //                 'title',
    //                 'createdAt'
    //             ],
    //             include: [{
    //                     model: User,
    //                     attributes: ['username']
    //                 },
    //                 {
    //                     model: Comments,
    //                     attributes: ['id', 'comment', 'post_id', 'user_id', 'createdAt'],
    //                     include: {
    //                         model: User,
    //                         attributes: ['username']
    //                     }
    //                 }
    //             ]
    //         });
    //         if (!dbPostData) {
    //             res.status(404).json({ message: 'No post found with this id' });
    //             return;
    //         }
    //         const posts = (await dbPostData).get({ plain: true });
    //         res.render('viewPost', { posts })
    //     } catch (err) {
    //             console.log(err);
    //             res.status(500).json(err);
    //         };
    // });
    console.log(req.session);
    const loggedIn = req.session.loggedIn;
    Posts.findByPk(req.params.id, {
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
            // res.json(dbPostData);
            // console.log(dbPostData);
            const posts = dbPostData.get({ plain: true });
            if(loggedIn == null){
                res.render('viewPost', { posts, loggedIn: false });
            } else {
                res.render('viewPost', { posts, loggedIn: true });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({ message: 'No post found with this id' });
        });
});
// CREATE posts
router.post('/', withAuth, (req, res) => {
    Posts.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
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