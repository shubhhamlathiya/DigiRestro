module.exports = {
    profileDetails:async(req,res)=>{
        try {
            
            const userId = await tokenController.getUserID(req,res);
            const usersData = await usersSchema.find({_id: userId}).select('name email_id mobile_no');
            res.send(usersData);
        } catch (error) {
            res.send("viewProfile error:" , error);
        }
    }
}