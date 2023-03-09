const cmsService = require('../services/cms');

const createContentType = async (req, res) => {
  try {
    const { name, fields } = req.body;
    const contentType = await cmsService.createContentType(name, fields);
    res.status(201).json(contentType);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const updateContentType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, fields } = req.body;
    const contentType = await cmsService.updateContentType(id, name, fields);
    res.status(200).json(contentType);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { createContentType, updateContentType };
