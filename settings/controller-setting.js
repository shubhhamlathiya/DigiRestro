// Admin Controller
tokenController = module.export = require("../controller/token-controller");
loginController = module.exports = require("../controller/authentication/login-controller");
registrationController = module.exports = require("../controller/authentication/registration-controller")
subscriptionController = module.exports = require("../controller/admin/subscription-controller/subscription-controller")
ownerController = module.exports = require("../controller/admin/owner-controller/owner-controller")
emailController = module.exports = require("../controller/email-controller/email-controller")
homeController = module.exports = require("../controller/home-controller/home-subscription-controller")
inquiryController = module.exports = require("../controller/admin/inquiry-controller/inquiry-controller")
companyController = module.exports = require("../controller/admin/company-controller/view-company")
profileController = module.exports = require("../controller/admin/profile-controller/profile-controller")


// Company Controller
companyDashboardController = module.exports = require("../controller/company/company-dashboard-controller")
companyController = module.exports = require("../controller/company/manage-company-controller")
manageBranchController = module.exports = require("../controller/company/manage-branch-controller")
manageCategoryController = module.exports = require("../controller/company/manage-category-controller")
manageSubCategoryController = module.exports = require("../controller/company/manage-sub-category-controller")
manageFoodController = module.exports = require("../controller/company/manage-food-controller")
checkSubscriptionExpiry = module.exports = require("../controller/subscription-controller/check-subscription-expiry")


// Branch Controller
branchDashboardController  = module.exports = require("../controller/branch/branch-dashboard-controller")



// loginController.bind_Url();
// module.exports = {tokenController};