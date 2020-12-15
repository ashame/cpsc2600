const { model, Schema } = require('mongoose');

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
})

const MenuItem = model("menuItem", menuItemSchema);

module.exports = { model: MenuItem, Schema: menuItemSchema };