const mongoose = require("mongoose");
module.exports = {
    // Insert data in subcsription_plan
    addSubscription: async (req, res) => {
        try {

            req.body.price = parseInt(req.body.price);
            req.body.duration = parseInt(req.body.duration);

            // console.log(req.body);

            const existingData = await subscriptionSchema.find({
                $and: [{plan_name: req.body.plan_name}, {description: req.body.description}, {duration: req.body.duration}, {price: req.body.price}]
            });

            if (!_.isEmpty(existingData)) {
                console.log("error: Subscription with similar data already exists");
            }

            const newSubscription = new subscriptionSchema(req.body);

            const result = await newSubscription.save();

            console.log(result)
            if (!result) {
                console.log("error: 'Failed to save subscription");
            }
            res.redirect("/admin/view-subscription");
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }, viewSubscription: async (req, res) => {
        try {
            const subscriptions = await subscriptionSchema.find().sort({ created_at: -1 });

            res.render(`${appPath}/admin/view-subscription.ejs`, {subscriptions});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    },
    //Fetch data from subscription_plan
     editSubsciption: async (req, res) => {
        try {
            const subscription = await subscriptionSchema.findOne({_id: new mongoose.Types.ObjectId(req.query.id)});
            
            res.render(`${appPath}/admin/edit-subscription.ejs`, {subscription});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }

    },
    //Update data from subscription_plan in DB
     updateSubscription: async (req, res) => {

        req.body.price = parseInt(req.body.price);
        req.body.duration = parseInt(req.body.duration);

        console.log(req.body);
        const existingData = await subscriptionSchema.find({
            $and: [{plan_name: req.body.plan_name}, {description: req.body.description}, {duration: req.body.duration}, {price: req.body.price}]
        });

        if (!_.isEmpty(existingData)) {
            console.log("error: Subscription with similar data already exists");
        }

        const result = await subscriptionSchema.updateOne({_id: new mongoose.Types.ObjectId(req.body._id)}, // Filter based on _id
            {
                $set: {
                    plan_name: req.body.plan_name,
                    description: req.body.description,
                    duration: req.body.duration,
                    price: req.body.price,
                },
            });

        console.log(result)

        if (result.modifiedCount > 0) {
            // console.log("Data updated successfully");
            
            res.redirect("/admin/view-subscription");
        } else {
            console.log("Error: Subscription with the given _id not found or no changes were made");
        }


    }, 
    //Delete data from subscription_plan in DB
    deleteSubsciption: async (req, res) => {
        try {
            const subscriptionId = req.query.id;
            // const subscription = await subscriptionSchema.deleteOne({_id: new mongoose.Types.ObjectId(subscriptionId)});
            const subscription = await subscriptionSchema.updateOne({_id: new mongoose.Types.ObjectId(subscriptionId)},
            {
                $set:{
                    is_active:false
                }
            })
            if (subscription.acknowledged === true) {   
                res.status(200).json({success: true, message: 'Subscription deleted successfully'});
            } else {
                res.status(404).json({success: false, message: 'Subscription not found'});
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
};
