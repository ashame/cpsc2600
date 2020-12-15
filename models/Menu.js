const { model, Schema } = require('mongoose');
const { Schema: menuItem } = require('./MenuItem');

const menuSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurants'
    },
    name: {
        type: String,
        required: true
    },
    items: [ menuItem ]
})

const Menu = model('menus', menuSchema);

module.exports = { model: Menu, Schema: menuSchema};