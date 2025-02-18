const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    comments: [{ body: String, date: Date }],
});

module.exports = mongoose.model('Item', itemSchema);
