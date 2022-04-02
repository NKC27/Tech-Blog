const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

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
        console.log("User found:", userData)
      const validPassword = await userData.checkPassword(req.body.password);
      console.log("Valid password", validPassword)
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
  });

} catch (err) {
  res.status(400).json(err);
}
});

router.post("/signup", async (req, res) => {
  try {
    console.log("Signing up:", req.body)
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

router.post("/logout", (req, res) => {
  if (req.session.logged_in){
    req.session.destroy(() => {
      res.status(204).end();
    })
  } else {
    res.status(404).end();
  }
})

module.exports = router;