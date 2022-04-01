const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
          console.log('Sorry no data found')
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("Password is invalid, please try again");
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
  }

  req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.json({ user: userData, message: 'You are now logged in!' });
    res.redirect('/');
  });

} catch (err) {
  res.status(400).json(err);
}
});

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
    });
    console.log(newUser);
    console.log("You are now signed up");
    res.status(200).json(newUser);
  } catch (error) {
    console.log("Sorry there was an error, please try again");
    res.status(404);
  }
});

module.exports = router;