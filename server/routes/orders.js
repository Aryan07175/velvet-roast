const express = require('express');
const auth = require('../middleware/auth');
const Order = require('../models/Order');

const router = express.Router();

// Place a new order (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        const newOrder = new Order({
            user: req.user.id,
            items,
            totalAmount
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get User's Orders (Protected)
router.get('/myorders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
