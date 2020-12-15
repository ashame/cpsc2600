const { model, Schema } = require('mongoose');

const addressSchema = new Schema({
    lineOne: {
        type: String,
        required: true
    },
    lineTwo: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    }
})

const Address = model('addresses', addressSchema);

module.exports = { model: Address, Schema: addressSchema };