const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose); 
const Currency = mongoose.Types.Currency; 

const cartSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true 
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true 
    }
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;