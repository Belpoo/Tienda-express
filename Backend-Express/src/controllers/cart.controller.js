const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }

    cart.items = cart.items.filter(item => item.product);

    res.json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    // Si no existe carrito, créalo
    if (!cart) {
      const newCart = new Cart({
        user: req.user.id,
        items: [{ product, quantity }]
      });

      await newCart.save();
      return res.status(201).json(newCart);
    }

    // 🔒 PROTECCIÓN: limpiar items inválidos
    cart.items = cart.items.filter(item => item.product);

    const existingItem = cart.items.find(item => {
      const productId = item.product._id
        ? item.product._id.toString()
        : item.product.toString();

      return productId === product;
    });

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const item = cart.items.find(item => {
      if (!item.product) return false;

      const id = item.product._id
        ? item.product._id.toString()
        : item.product.toString();

      return id === productId;
    });

    if (!item) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }

    // 🔥 Aquí está la lógica correcta
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.items = cart.items.filter(item => {
        const id = item.product._id
          ? item.product._id.toString()
          : item.product.toString();
        return id !== productId;
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.json(cart);

  } catch (error) {
    console.error(error);
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