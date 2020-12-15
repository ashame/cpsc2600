const { model, Schema } = require('mongoose');
const { 
    Address: { Schema: Address }, 
    Menu : { Schema: Menu }
} = require('./');

const restaurantSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: Address,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    website: {
        type: String
    },
    menus: [ Menu ]
});

restaurantSchema.statics.findByMenuId = function(id, projection = null, callback = null) {
    if (typeof projection == 'function') {
        callback = projection;
        projection = null;
    }
    return this.findOne({ 'menus._id': id }, projection, callback);
}

const Restaurant = model('restaurants', restaurantSchema);

module.exports = { model: Restaurant, Schema: restaurantSchema }; 