const db = require('../../db/models');

const { ContentType, Content } = db;

const createContentType = async (name, fields) => {
  const contentType = await ContentType.create({ name, fields });
  return contentType;
};

const updateContentType = async (id, name, fields) => {
  await ContentType.update({ name, fields }, { where: { id } });
  const contentType = await ContentType.findOne({ where: { id } });
  return contentType;
};

const createCollection = async (contentTypeId, entry) => {
  const collection = await Content.create({ contentTypeId, entry });
  return collection;
};

const getAllContentTypes = async () => {
  const contentTypes = await ContentType.findAll();
  return contentTypes;
};

const getCollectionById = async (contentTypeId) => {
  const collection = await Content.findAll({ where: { contentTypeId } });
  return collection;
};

const deleteField = async (id, name) => {
  const contentType = await ContentType.findOne({ where: { id } });
  const fields = contentType.fields.filter((field) => field !== name);
  await ContentType.update({ fields }, { where: { id } });
  const collections = await Content.findAll({ where: { contentTypeId: id } });
  collections.map(async (collection) => {
    const { entry } = collection;
    delete entry[name];
    await Content.update({ entry }, { where: { id: collection.id } });
  });
  const updatedContentType = await ContentType.findOne({ where: { id } });
  return updatedContentType;
};

const updateCollection = async (id, entry) => {
  await Content.update({ entry }, { where: { id } });
  const collection = await Content.findOne({ where: { id } });
  return collection;
};

const deleteCollection = async (id) => {
  await Content.destroy({ where: { id } });
};

const updateField = async (id, oldName, newName) => {
  const contentType = await ContentType.findOne({ where: { id } });
  const fields = contentType.fields.map((field) => {
    if (field === oldName) {
      return newName;
    }
    return field;
  });
  await ContentType.update({ fields }, { where: { id } });
  const collections = await Content.findAll({ where: { contentTypeId: id } });
  collections.map(async (collection) => {
    const { entry } = collection;
    entry[newName] = entry[oldName];
    delete entry[oldName];
    await Content.update({ entry }, { where: { id: collection.id } });
  });
  const updatedContentType = await ContentType.findOne({ where: { id } });
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
