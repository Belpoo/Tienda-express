const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            const newCart = new Cart({
                user: req.user.id,
                items: [{ product, quantity }]
            });
            await newCart.save();
            return res.status(201).json(newCart);
        }

        const existingItem = cart.items.find(item => item.product.toString() === product);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product, quantity });
        }

        await cart.save();
        await cart.populate('items.product');
        res.json(cart);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();
        await cart.populate('items.product');
        res.json(cart);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

        cart.items = [];
        await cart.save();

        res.json({ message: 'Carrito vaciado correctamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};