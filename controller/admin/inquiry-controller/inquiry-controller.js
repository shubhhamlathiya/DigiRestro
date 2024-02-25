const contactUs = require("../../../modules/contact-us-model");

module.exports = {
    viewInquiry:async(req,res)=>{
        try {
            // const viewInqData = await contactUsSchema.find();
            const viewInqData = await contactUsSchema.find().sort({ created_at: -1 });
            res.render(`${appPath}/admin/view-query.ejs` , {viewInqData});         
        } catch (error) {
            console.log("viewInquiry Error:" , error)
        }
    }
}