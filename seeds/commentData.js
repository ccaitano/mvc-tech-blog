const { Comments } = require('../models');

const commentData = [
    {
        comment: 'Comment for Sample Post',
        comment_date: 'September 04, 2022 09:00:00',
        user_id: 1,
        post_id: 1,
    },
];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;