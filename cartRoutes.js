const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => {
    const product = req.body;
    if (!req.session.cart) req.session.cart = [];

    const existing = req.session.cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        req.session.cart.push({ ...product, quantity: 1 });
    }

    res.redirect("/products"); // stay on product page after add
});

router.post("/buy-now", (req, res) => {
    const product = req.body;
    req.session.cart = [{ ...product, quantity: 1 }];
    res.redirect("/cart");
});

router.get("/", (req, res) => {
    const cart = req.session.cart || [];
    res.render("cart", { cart });
});

// Increase quantity
router.post("/increase", (req, res) => {
    const { id } = req.body;
    if (req.session.cart) {
        const item = req.session.cart.find(i => i.id === id);
        if (item) item.quantity += 1;
    }
    res.redirect("/cart");
});

// Decrease quantity
router.post("/decrease", (req, res) => {
    const { id } = req.body;
    if (req.session.cart) {
        const item = req.session.cart.find(i => i.id === id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
        } else {
            req.session.cart = req.session.cart.filter(i => i.id !== id);
        }
    }
    res.redirect("/cart");
});

// Remove item
router.post("/remove", (req, res) => {
    const { id } = req.body;
    if (req.session.cart) {
        req.session.cart = req.session.cart.filter(item => item.id !== id);
    }
    res.redirect("/cart");
});

module.exports = router;
