const router = require('express').Router();
const { User, Posts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE comments
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comments.create({
                comment: req.body.comment,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

module.exports = router;