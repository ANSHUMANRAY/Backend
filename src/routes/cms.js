const express = require('express');

const router = express.Router();
const { authenticate } = require('../middlewares/authValidate');
const cmsController = require('../controllers/cms');

router.post('/contentTypes', authenticate, cmsController.createContentType);
router.put('/contentTypes/:id', authenticate, cmsController.updateContentType);

module.exports = router;
