const express = require('express');
const requestController = require('../controllers/requestController');

const router = express.Router();

router.post('/', requestController.createOne);
router.patch('/:key', requestController.updateOne);
router.delete('/canceled/:key', requestController.deleteCanceledOne);
router.delete('/approved/:key', requestController.deleteApprovedOne);
router.get('/', requestController.getRequests);

module.exports = router;