const express = require('express');

const router = express.Router();
const { authenticate } = require('../middlewares/authValidate');
const cmsController = require('../controllers/cms');

router.post('/contentTypes', authenticate, cmsController.createContentType);
router.put('/contentTypes/:id', authenticate, cmsController.updateContentType);
router.post('/collections', authenticate, cmsController.createCollection);
router.get('/contentTypes', authenticate, cmsController.getAllContentTypes);
router.get('/collections/:contentTypeId', authenticate, cmsController.getCollectionById);
router.patch('/contentTypes/:id', authenticate, cmsController.deleteField);
router.put('/collections/:id', authenticate, cmsController.updateCollection);
router.delete('/collections/:id', authenticate, cmsController.deleteCollection);
router.patch('/fields/:id', authenticate, cmsController.updateField);

module.exports = router;
