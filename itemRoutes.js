const router = require('express').Router();
const { createItem, getAllItems, getItem, updateItem, deleteItem, addItemComment } = require('../controllers/itemController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createItem);
router.get('/', getAllItems);
router.get('/:id', getItem);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);
router.post('/:id/comments', addItemComment);

module.exports = router;
