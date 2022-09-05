const router = require('express').Router();
const { User, Posts, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Route "/"
router.get('/', withAuth, (req, res) => {
    Posts.findAll({
            attributes: ['id', 'title', 'content', 'upload_date'],
            order: [['upload_date', 'ASC']],
            include: [
                {
                    model: Comments,
                    attributes: ['id', 'comment', 'comment_date', 'user_id'],
                    order: [['comment_date', 'ASC']],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })

        .then(postData => {
            const posts = postData.map((post) => post.get({ plain: true }));

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn,
            });
        })
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

// Route "/login"
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Route "/signup"
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Route "/dashboard"
router.get('/dashboard', withAuth, (req, res) => {
    Posts.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'upload_date'
            ],
            include: [{
                    model: Comments,
                    attributes: ['id', 'comment', 'comment_date', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Route "/dashboard/new"

// Route "/dashboard/edit/:id"

// Route "/post/:id"

module.exports = router;