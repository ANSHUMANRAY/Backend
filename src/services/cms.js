const db = require('../../db/models');

const { ContentType } = db;

const createContentType = async (name, fields) => {
  const contentType = await ContentType.create({ name, fields });
  return contentType;
};

const updateContentType = async (id, name, fields) => {
  const contentType = await ContentType.update({ name, fields }, { where: { id } });
  return contentType;
};

module.exports = { createContentType, updateContentType };
