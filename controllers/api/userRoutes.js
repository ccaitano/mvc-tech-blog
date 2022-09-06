const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  console.log('New User!');
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    
    req.session.loggedIn = true;
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    console.log(req.session);
    req.session.save(() => {
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', (req, res) => {
  console.log("LOGGED");
  User.findOne({
      where: {
        username: req.body.username,
      },
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }

        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

      req.session.save(() => {
        
        res.json({
            user: dbUserData,
            message: 'You are now logged in!'
        });
      });
    });
  }); 


// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
