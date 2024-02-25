const {sendEmail} = require("../email-controller/email-controller");

const sendSubscriptionExpiryReminder = async () => {
    const currentTimestamp = new Date();
    const oneWeekAhead = new Date(currentTimestamp.getTime() + 7 * 24 * 60 * 60 * 1000);

    console.log(`Current Timestamp: ${currentTimestamp}`);
    console.log(`one week before: " + ${oneWeekAhead}`);

    const expiringSubscriptions = await purchaseSubscriptionSchema.find({
        $and: [
            {end_date: {$lte: oneWeekAhead}},
            {end_date: {$gt: currentTimestamp}},
            {is_active: 'true'}
        ]
    });

    for (const subscription of expiringSubscriptions) {

        // console.log(`Subscription for customer ${subscription.customerId} will expire in one week.`);

        const branchData = await branchSchema.findOne({_id: subscription.branch_id});
        const userData = await usersSchema.findOne({_id: branchData.user_id});

        const reminderSubject = "Subscription Expiry Reminder";
        const reminderText = `Your subscription for Branch ${userData.name} will expire in one week. Please renew to avoid service interruption.`;

        const emailResult = await emailController.sendEmail(userData.email_id, reminderSubject, reminderText);
        // console.log(emailResult);
    }
};

module.exports = sendSubscriptionExpiryReminder;
