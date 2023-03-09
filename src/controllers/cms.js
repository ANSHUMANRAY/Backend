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

module.exports = { createContentType };
