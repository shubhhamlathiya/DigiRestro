const mongoose = require("mongoose");
module.exports = {
    viewClient: async (req, res) => {
        try {
            const users = await usersSchema.find({role_name: "O"});
            res.render(`${appPath}/admin/view-client.ejs`, {users});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}