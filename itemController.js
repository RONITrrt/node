const Item = require('../models/item');

exports.createItem = async (req, res) => {
    const newItem = new Item(req.body);

    try {
        const savedItem = await newItem.save();
        res.status(201).send(savedItem);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).send(items);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).send('Item not found');
        res.status(200).send(item);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).send('Item not found');
        res.status(200).send(updatedItem);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).send('Item not found');
        res.status(200).send('Item deleted');
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addItemComment = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).send('Item not found');

        item.comments.push({ body: req.body.body, date: new Date() });
        const updatedItem = await item.save();
        res.status(200).send(updatedItem);
    } catch (err) {
        res.status(400).send(err);
    }
};
