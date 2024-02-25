const checkSubscriptionExpiry = async () => {
    // console.log("1")
    const currentTimestamp = new Date();

    console.log(currentTimestamp)

    const expiredSubscriptions = await purchaseSubscriptionSchema.find({
        $and: [{end_date: {$lte: currentTimestamp}}, {is_active: 'true'}]
    });

    // console.log(expiredSubscriptions)
    // console.log("2")
    for (const subscription of expiredSubscriptions) {
        if (subscription.end_date <= currentTimestamp) {
            subscription.is_active = 'false';
            await subscription.save();

            const branchData = await branchSchema.findOne({_id: subscription.branch_id});

            const userData = await usersSchema.findOne({_id: branchData.user_id})
            // user_id
            console.log(`Subscription for this one Branch ${userData.name} has expired.`);
            const reminderSubject = "Subscription expired"
            const reminderText = `Subscription for Branch ${userData.name} has expired.`

            const emailSent = await emailController.sendEmail(userData.email_id, reminderSubject, reminderText);
            // console.log("hy")
            console.log(emailSent)
        } else {
            // subscription.status = 'active';
            // await subscription.save();
            console.log(`Subscription for customer ${subscription.customerId} is still active, but the end date has passed.`);
        }
        // console.log("3")
    }
    // console.log("4")
};


module.exports = checkSubscriptionExpiry;