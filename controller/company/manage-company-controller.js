const {handleAuthRedirect, setDefaultCompany, fetchAndFormatCompanies} = require("./company-helper");
const mongoose = require("mongoose");
module.exports = {
    viewCompany: async (req, res) => {
        try {
            // const userId = req.session.userId;
            const userId = await tokenController.getUserID(req, res);
            // Set default company and check if it's already set
            await setDefaultCompany(userId, req);

            const formattedCompanies = await fetchAndFormatCompanies(userId, req);
            let companyId = req.session.selectedCompanyId || (formattedCompanies[0] && formattedCompanies[0]._id);

            console.log("Company Id in session dashboard: " + companyId);

            const companies = await companySchema.find({ user_id: userId, deleted: false });

            console.log(companies)

            res.render(`${appPath}/company/master-company.ejs`, {
                formattedCompanies: formattedCompanies,
                companyId: companyId,
                companies: companies,
                selectedLegalName: req.session.selectedLegalName,
                selectedCompanyLogo: req.session.selectedCompanyLogo,
                // isDefaultCompanySet: isDefaultCompanySet, // Add this line to pass the information to the view
            });

        } catch (error) {
            console.error("Error in /company/master-company:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    addCompany: async (req, res) => {
        try {
            const {company_name, legal_name} = req.body;
            const logoPath = req.file ? '/uploads/' + req.file.filename : '';

            console.log("Stored Path in Database: " + logoPath);
            console.log(logoPath);
            // const userId = req.session.userId;
            const userId = await tokenController.getUserID(req, res);
            // console.log("add company: " + userId)

            // console.log(logoPath)
            const newCompany = new companySchema({
                company_logo: logoPath,
                company_name: company_name,
                legal_name: legal_name,
                user_id: new mongoose.Types.ObjectId(userId),
            });

            const result = await newCompany.save();

            // console.log(result);
            if (!result) {
                console.log("data can't insert into database")
            } else {
                console.log("Company added successfully")
            }
            res.redirect("/company/manage-company")
            // res.status(201).json({message: 'Company added successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }

    },
    deleteCompany: async (req, res) => {
        try {
            const companyId = req.query.id;

            console.log(companyId)
            const company = await companySchema.updateOne(
                {_id: new mongoose.Types.ObjectId(companyId)},
                {
                    $set: {
                        deleted: true,
                        deleted_at: new Date()
                    }
                }
            );
            if (company.nModified > 0) {
                res.status(200).json({success: true, message: 'company deleted successfully'});
            } else {
                res.status(404).json({success: false, message: 'company not found'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}