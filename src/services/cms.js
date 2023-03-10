const db = require('../../db/models');

const { ContentType, Content } = db;

const createContentType = async (name, fields, userId) => {
  const contentType = await ContentType.create({ name, fields, userId });
  return contentType;
};

const updateContentType = async (id, name, fields, userId) => {
  await ContentType.update({ name, fields }, { where: { id, userId } });
  const contentType = await ContentType.findOne({ where: { id, userId } });
  return contentType;
};

const createCollection = async (contentTypeId, entry, userId) => {
  const collection = await Content.create({ contentTypeId, entry, userId });
  return collection;
};

const getAllContentTypes = async (userId) => {
  const contentTypes = await ContentType.findAll({ where: { userId } });
  return contentTypes;
};

const getCollectionById = async (contentTypeId, userId) => {
  const collection = await Content.findAll({ where: { contentTypeId, userId } });
  return collection;
};

const deleteField = async (id, name, userId) => {
  const contentType = await ContentType.findOne({ where: { id, userId } });
  const fields = contentType.fields.filter((field) => field !== name);
  await ContentType.update({ fields }, { where: { id, userId } });
  const collections = await Content.findAll({ where: { contentTypeId: id, userId } });
  collections.map(async (collection) => {
    const { entry } = collection;
    delete entry[name];
    await Content.update({ entry }, { where: { id: collection.id, userId } });
  });
  const updatedContentType = await ContentType.findOne({ where: { id, userId } });
  return updatedContentType;
};

const updateCollection = async (id, entry, userId) => {
  await Content.update({ entry }, { where: { id, userId } });
  const collection = await Content.findOne({ where: { id, userId } });
  return collection;
};

const deleteCollection = async (id, userId) => {
  await Content.destroy({ where: { id, userId } });
};

const updateField = async (id, oldName, newName, userId) => {
  const contentType = await ContentType.findOne({ where: { id, userId } });
  const fields = contentType.fields.map((field) => {
    if (field === oldName) {
      return newName;
    }
    return field;
  });
  await ContentType.update({ fields }, { where: { id, userId } });
  const collections = await Content.findAll({ where: { contentTypeId: id, userId } });
  collections.map(async (collection) => {
    const { entry } = collection;
    entry[newName] = entry[oldName];
    delete entry[oldName];
    await Content.update({ entry }, { where: { id: collection.id, userId } });
  });
  const updatedContentType = await ContentType.findOne({ where: { id, userId } });
  return updatedContentType;
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
