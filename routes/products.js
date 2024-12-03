var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', function (req, res) {
    const filePath = path.join(__dirname, '..', 'products.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read products file' });
        }

        try {
            const products = JSON.parse(data);
            res.json(products);
        } catch (parseError) {
            res.status(500).json({ error: 'Error parsing products file' });
        }
    });
});

router.get('/:id', function (req, res) {
    const productId = parseInt(req.params.id);
    const filePath = path.join(__dirname, '..', 'products.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read products file' });
        }

        try {
            const products = JSON.parse(data);
            const product = products.find(p => p.id === productId);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json(product);
        } catch (parseError) {
            res.status(500).json({ error: 'Error parsing products file' });
        }
    });
});

router.get('/:id/:qt', function (req, res) {
    const productId = parseInt(req.params.id);
    const quantity = parseInt(req.params.qt);
    const filePath = path.join(__dirname, '..', 'products.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read products file' });
        }

        try {
            const products = JSON.parse(data);
            const product = products.find(p => p.id === productId);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const totalPrice = product.price * quantity;
            res.json({
                product: product.name,
                price: product.price,
                quantity: quantity,
                totalPrice: totalPrice,
            });
        } catch (parseError) {
            res.status(500).json({ error: 'Error parsing products file' });
        }
    });
});

router.get('/instock/:qt', (req, res) => {
    const filePath = path.join(__dirname, '..', 'products.json');
    const quantity = parseInt(req.params.qt, 10);

    if (isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ error: 'Invalid quantity parameter' });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read products file' });
        }

        try {
            const products = JSON.parse(data);
            const filteredProducts = products.filter(product => product.stock >= quantity);

            if (filteredProducts.length > 0) {
                res.json(filteredProducts);
            } else {
                res.status(404).json({ error: 'No products found with sufficient stock' });
            }
        } catch (parseError) {
            res.status(500).json({ error: 'Error parsing products file' });
        }
    });
});

module.exports = router;
