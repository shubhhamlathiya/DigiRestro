const registrationController = require("../../../controller/authentication/registration-controller");

module.exports = {
  bind_Url: function () {
    // Authentication of users
    app.post("/login", async (req, res) => {
      loginController.loginUser(req, res);
    });

    app.post("/registration", async (req, res) => {
      registrationController.registerCompany(req, res);
    });

    app.post("/otpVerification", async(req,res)=>{
      registrationController.otpVerification(req, res);
    })
  },
};

// Redirect to the login page else execte next code
// function checkSession(req, res, next) {
//   if (!req.session.user) {
//     signIn(req, res);
//   } else {
//     // console.log(`Retrieve Dashboard Session: ${JSON.stringify(req.session.user.token)} `);
//     // const replace = JSON.stringify(req.session.user.token).replace(/^"(.*)"$/, '$1');
//     // console.log(replace);
//     // const verifyUser = jwt.verify(replace, "polkiolkuhytghbnhytghbnhytredfrtg");
//     // console.log(verifyUser._id);
//     next();
//   }
// }
