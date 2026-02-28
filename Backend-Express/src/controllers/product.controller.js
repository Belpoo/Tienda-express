const Product = require('../models/Product');

exports.createProduct = async (protect, req, res) => {
  try {
    if(protect.role !== 'admin') 
      return res.status(403).json({ message: 'Acceso denegado' });
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener producto" });
  }
};
