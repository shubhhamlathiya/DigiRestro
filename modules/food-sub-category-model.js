const mongoose = require('mongoose');

const foodSubCategorySchema = new mongoose.Schema(
    {
        sub_category_name: {
            type: String,
            required: true,
        },
        food_category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'food_category',
            required: true,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
        created_at: {
            type: Date,
            default: new Date(),
        },
        deleted_at: {
            type: Date,
            default: new Date(),
        },
        updated_at: {
            type: Date,
            default: new Date(),
        },
    }, {collection: "food_sub_category"}
);

const foodSubCategory = mongoose.model('food_sub_category', foodSubCategorySchema);

module.exports = foodSubCategory;
