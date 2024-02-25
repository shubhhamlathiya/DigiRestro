const viewCompany = require("../../../controller/admin/company-controller/view-company");
const profileController = require("../../../controller/admin/profile-controller/profile-controller");
const tokenController = require("../../../controller/token-controller");

module.exports = {
  bind_Url: function () {
    app.get("/admin/dashboard", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          req.session.alert = false;
          res.render(`${appPath}/admin/index.ejs`);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/dashboard error: ", error);
      }
    });

    app.get("/admin/view-subscription", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          subscriptionController.viewSubscription(req, res);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/view-subscription error: ", error);
      }
    });

    app.get("/admin/add-subscription", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          res.render(`${appPath}/admin/add-subscription.ejs`);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/add-subscription error: ", error);
      }
    });

    app.post("/admin/add-subscription", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          subscriptionController.addSubscription(req, res);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/add-subscription error:" + error);
      }
    });

    app.get("/admin/edit-subscription", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          subscriptionController.editSubsciption(req, res);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/edit-subscription error: ", error);
      }
    });

    app.post("/admin/edit-subscription", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          subscriptionController.updateSubscription(req, res);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/edit-subscription error: ", error);
      }
    });

    app.post("/admin/delete-subscription", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          subscriptionController.deleteSubsciption(req, res);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/delete-subscription error: ", error);
      }
    });
    app.post("/admin/profile", async (req, res) => {
      try {
        const callback = await tokenController.auth(req, res);
        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          profileController.profileDetails(req, res);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/profile error: ", error);
      }
    });

    app.get("/admin/view-client", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          ownerController.viewClient(req, res);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/view-client error: ", error);
      }
    });

    app.post("/admin/view-specific-company", async (req, res) => {
      try {
        const callback = await tokenController.auth(req, res);
        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          companyController.viewSpecificCompany(req, res);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/view-specific-company error: ", error);
      }
    });

    app.post("/admin/view-specific-branch", async (req, res) => {
      try {
        const callback = await tokenController.auth(req, res);
        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          companyController.viewSpecificBranch(req, res);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/view-specific-branch error: ", error);
      }
    });

    app.get("/admin/view-company", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          companyController.viewCompany(req, res);
          // res.render(`${appPath}/admin/view-company.ejs`);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/view-company error: ", error);
      }
    });

    app.get("/admin/view-branch", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          res.render(`${appPath}/admin/view-branch.ejs`);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/view-branch error: ", error);
      }
    });

    app.get("/admin/view-query", async (req, res) => {
      try {
        //Check logged-in user
        const callback = await tokenController.auth(req, res);

        if (callback.callback && _.isEqual(callback.role_name, "A")) {
          inquiryController.viewInquiry(req, res);

          // res.render(`${appPath}/admin/view-query.ejs`);
        } else {
          res.redirect("/home/auth-login");
        }
      } catch (error) {
        res.send("/admin/view-query error: ", error);
      }
    });
  },
};
