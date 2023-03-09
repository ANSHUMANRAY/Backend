const db = require('../../db/models');

const { ContentType } = db;

const createContentType = async (name, fields) => {
  const contentType = await ContentType.create({ name, fields });
  return contentType;
};

module.exports = { createContentType };
