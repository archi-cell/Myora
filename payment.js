const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Show checkout page (reads cart for logged-in user)
router.get("/checkout", async (req, res) => {
    try {
        if (!req.session.user) return res.redirect("/login");
        const userId = req.session.user._id;
        const cart = await Cart.findOne({ userId }).populate("products.productId");
        // calculate total
        let amount = 0;
        const items = (cart?.products || []).map(it => {
            const p = it.productId;
            const price = p?.price || 0;
            const qty = it.quantity || 1;
            amount += price * qty;
            return { productId: p?._id, name: p?.name, price, qty };
        });
        res.render("checkout", { user: req.session.user, items, amount });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading checkout");
    }
});

// Fake payment processing endpoint
router.post("/pay", async (req, res) => {
    try {
        if (!req.session.user) return res.status(401).send("Login required");
        const userId = req.session.user._id;
        // from form: amount and items JSON string (we'll send items as hidden input)
        const { amount, itemsJson, action } = req.body;

        // If user clicked "Cancel" on fake checkout:
        if (action === "cancel") {
            return res.redirect("/payment/cancel");
        }

        // Create order with status 'paid'
        const items = JSON.parse(itemsJson || "[]");
        const order = await Order.create({
            userId,
            items,
            amount: Number(amount),
            status: "paid"
        });

        // OPTIONAL: clear user's cart
        await Cart.findOneAndDelete({ userId });

        // redirect to success page and show order id
        res.redirect(`/payment/success?orderId=${order._id}`);
    } catch (err) {
        console.error(err);
        res.redirect("/payment/cancel");
    }
});

router.get("/success", async (req, res) => {
    const { orderId } = req.query;
    const order = orderId ? await Order.findById(orderId).populate("items.productId") : null;
    res.render("success", { order });
});

router.get("/cancel", (req, res) => {
    res.render("cancel");
});

module.exports = router;
