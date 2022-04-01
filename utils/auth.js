const withAuth = (req, res, next) => {
    //If you are not logged in you will be redirected back to the login page.
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;