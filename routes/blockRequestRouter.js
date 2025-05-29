const express = require('express');
const blockRequestController = require('../controllers/blockRequestController');

const router = express.Router();
router.post('/', blockRequestController.createOne);
router.get('/', blockRequestController.getAll);
router.delete('/blockUser/:key', blockRequestController.blockUserAndDelete);
router.delete('/:key', blockRequestController.deleteOne);
router.patch('/:key', blockRequestController.updateOne);

module.exports = router;