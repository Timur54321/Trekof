const express = require('express');
const multer = require('multer');
const objectController = require('../controllers/objectController');

const router = express.Router();

router.get('/:key', objectController.getFile);

const upload = multer({ storage: multer.memoryStorage() });
router.post('/upload', upload.single('file'), objectController.uploadFile);

module.exports = router;
