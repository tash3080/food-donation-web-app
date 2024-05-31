const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    meal: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
