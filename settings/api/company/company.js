const mongoose = require("mongoose");

const {
    fetchAndFormatCompanies, setDefaultCompany, setDefaultCompanySession, upload, handleAuthRedirect,
} = require("../../../controller/company/company-helper");

module.exports = {
    bind_Url: function () {
        app.get("/company/dashboard", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            companyDashboardController.dashboard(req, res);
        });

        app.post("/storeSelectedCompany", async (req, res) => {
            try {
                const callback = await tokenController.auth(req, res);
                if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

                const selectedCompanyId = req.body.companyId;
                const selectedCompany = await companySchema.findById(selectedCompanyId);

                // console.log(selectedCompany)
                if (selectedCompany) {
                    setDefaultCompanySession(selectedCompany, req.session);
                    res.sendStatus(200);
                } else {
                    console.error("Selected company not found");
                    res.status(404).send("Selected company not found");
                }
            } catch (error) {
                console.error("Error in /storeSelectedCompany:", error);
                res.status(500).send("Internal Server Error");
            }
        });

        app.get("/company/manage-company", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            companyController.viewCompany(req, res);
        });

        app.post("/company/add-company", upload.single("company_logo"), async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            companyController.addCompany(req, res);
        });

        app.post("/company/delete-company", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            companyController.deleteCompany(req, res);
        });


        app.get("/company/manage-branch", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageBranchController.viewBranch(req, res);
        });

        app.post("/company/add-branch", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageBranchController.addBranch(req, res);
        });

        app.post("/company/insert-branch-data", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageBranchController.insertBranchData(req, res);
        });

        app.get("/company/manage-category", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageCategoryController.viewCategory(req, res);
        });

        app.post("/company/add-category", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageCategoryController.addCategory(req, res);
        });

        app.post("/company/update-category", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageCategoryController.updateCategory(req, res);
        });

        app.get("/company/category-activeAndDeactive", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageCategoryController.activeAndDeactive(req, res);
        });

        app.get("/company/manage-sub-category", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageSubCategoryController.viewSubCategory(req, res);
        });

        app.post("/company/add-sub-category", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageSubCategoryController.addSubCategory(req, res);
        });

        app.post("/company/update-sub-category", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageSubCategoryController.updateSubCategory(req, res);
        });

        app.get("/company/sub-category-activeAndDeactive", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageSubCategoryController.activeAndDeactive(req, res);
        });
        app.get("/company/manage-food", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageFoodController.viewFood(req, res);
        });

        app.post("/company/add-food-item", async (req, res) => {
            const callback = await tokenController.auth(req, res);
            if (!handleAuthRedirect(callback, res, "/home/auth-login")) return;

            manageFoodController.addFoodItem(req, res);
        });

        app.get("/logout", async (req, res) => {
            req.session.destroy((err) => {
                if (err) {
                    console.error("Error destroying session:", err);
                    return res.status(500).json({error: "Internal Server Error"});
                }

                // Clear the session cookie
                res.clearCookie("jwt");

                console.log("'Logout successful'");
                isDefaultCompanySet = true;
                // res.json({ message: 'Logout successful' });
                res.redirect("/home/auth-login");
            });
        });
    },
};
