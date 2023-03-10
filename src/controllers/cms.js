const cmsService = require('../services/cms');

const createContentType = async (req, res) => {
  try {
    const { name, fields } = req.body;
    const contentType = await cmsService.createContentType(name, fields);
    res.status(201).json(contentType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContentType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, fields } = req.body;
    const contentType = await cmsService.updateContentType(id, name, fields);
    res.status(200).json(contentType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCollection = async (req, res) => {
  try {
    const { contentTypeId, entry } = req.body;
    const collection = await cmsService.createCollection(contentTypeId, entry);
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllContentTypes = async (_req, res) => {
  try {
    const contentTypes = await cmsService.getAllContentTypes();
    res.status(200).json(contentTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCollectionById = async (req, res) => {
  try {
    const { contentTypeId } = req.params;
    const collection = await cmsService.getCollectionById(contentTypeId);
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteField = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const contentType = await cmsService.deleteField(id, name);
    res.status(200).json(contentType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { entry } = req.body;
    const collection = await cmsService.updateCollection(id, entry);
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    await cmsService.deleteCollection(id);
    res.status(200).json({ message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldName, newName } = req.body;
    const contentType = await cmsService.updateField(id, oldName, newName);
    res.status(200).json(contentType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContentType,
  updateContentType,
  createCollection,
  getAllContentTypes,
  getCollectionById,
  deleteField,
  updateCollection,
  deleteCollection,
  updateField,
};
