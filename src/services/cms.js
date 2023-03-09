const db = require('../../db/models');

const { ContentType, Content } = db;

const createContentType = async (name, fields) => {
  const contentType = await ContentType.create({ name, fields });
  return contentType;
};

const updateContentType = async (id, name, fields) => {
  const contentType = await ContentType.update({ name, fields }, { where: { id } });
  return contentType;
};

const createCollection = async (contentTypeId, entry) => {
  const collection = await Content.create({ contentTypeId, entry });
  return collection;
};

module.exports = { createContentType, updateContentType, createCollection };
