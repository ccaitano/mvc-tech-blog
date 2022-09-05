const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
  foreignKey: 'user_id'
});

// Comments.belongsToMany(User, {
//     foreignKey: 'user_id'
//   });

module.exports = { User, Project, Comments };
