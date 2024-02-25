module.exports = {
  bind_Url: function () {
    app.get("/home", async (req, res) => {
      req.session.alert = false;
      
      homeController.homeSubscription(req, res);
    });

    app.get("/home/subscription", (req, res) => {
      if (!(_.isUndefined(req.query.id) || _.isNull(req.query.id))) {
        res.render(`${appPath}/home/subscription.ejs`, {
          session: req.session,
        });
      } else {
        res.redirect("/home");
      }
    });
    app.get("/home/otp", (req, res) => {
      
      res.render(`${appPath}/home/otp.ejs`);
    });

    app.get("/home/auth-login", (req, res) => {
      res.render(`${appPath}/home/auth-login.ejs`, { session: req.session });
    });

    app.post("/home/contact-us", (req, res) => {
      homeController.contactUs(req,res);
      
      // res.render(`${appPath}/home/auth-login.ejs`);
    });
  },
};
