const tokenController = require("../../../controller/token-controller");

module.exports = {
    bind_Url: function () {
        app.get("/branch/dashboard", async (req, res) => {
            try {
                const callback = await tokenController.auth(req, res);

                if (callback.callback && _.isEqual(callback.role_name, "B")) {
                    branchDashboardController.dashboard(req, res);
                } else {
                    res.redirect("/home/auth-login");
                }
            } catch (error) {
                res.send("/branch/dashboard error: ", error);
            }
        });

        app.get("/branch/assign-table", (req, res) => {
            res.render(`${appPath}/branch/assign-table.ejs`);
        });

        app.get("/branch/master-area", (req, res) => {
            res.render(`${appPath}/branch/master-area.ejs`);
        });

        app.get("/branch/master-order", (req, res) => {
            res.render(`${appPath}/branch/master-order.ejs`);
        });

        app.get("/branch/master-table", (req, res) => {
            res.render(`${appPath}/branch/master-table.ejs`);
        });
    }
}


// app.get("/", (req, res) => {
//   res.locals.showAlert = false;
//   res.render(`${appPath}/auth/sign-in.ejs`);
// });

// app.get("/dashboard", async (req, res) => {
//     const callback = await tokenController.auth(req, res);
//     if (callback) {
//         console.log(callback);
//         count = 0;
//         res.locals.showAlert = false;
//         res.render(`${appPath}/index.ejs`);
//     } else {
//         res.redirect("/sign-in");
//     }
//     // console.log(`Retrieve Dashboard cookie: ${req.cookies.jwt} `);
// });

// signIn = module.exports = (req, res) => {
//     count = 1;
//     res.locals.showAlert = false;
//     res.redirect("/sign-in");
// };

// app.get("/sign-in", async (req, res) => {
//     if (count) {
//         count = 0;
//         res.locals.showAlert = true;
//     } else {
//         res.locals.showAlert = false;
//     }
//     res.render(`${appPath}/auth/sign-in.ejs`);
// });

// app.get("/sign-up", async (req, res) => {
//     globalMessage = {message: JSON.stringify(globalMessage)};
//     // console.log(globalMessage);
//     globalMessage = null;
//     res.render(`${appPath}/auth/sign-up.ejs`);
// });