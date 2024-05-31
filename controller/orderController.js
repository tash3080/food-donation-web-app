const Order = require('../models/orderModel');
const nodemailer = require('nodemailer');

exports.getOrderForm = (req, res) => {
    res.render('orderForm');
};

exports.submitOrder = async (req, res) => {
    try {
        const { meal, quantity, date, timeSlot } = req.body;
        const order = new Order({ meal, quantity, date, timeSlot });
        await order.save();

        // Send email to admin
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'Danishkumar1001@gmail.com',
                pass: 'pvjrtyacbggvikwq'
            }
        });

        const mailOptions = {
            from: 'Danishkumar1001@gmail.com',
            to: 'kumardanishonline@gmail.com', // Update the recipient email
            subject: 'New Order Submitted',
            text: `New order details:\nMeal: ${meal}\nQuantity: ${quantity}\nDate: ${date}\nTime Slot: ${timeSlot}`
        };

        await transporter.sendMail(mailOptions);

        res.send('Order submitted successfully.');
    } catch (error) {
        console.error('Error submitting order:', error);
        res.status(500).send('Error submitting order. Please try again later.');
    }
};
