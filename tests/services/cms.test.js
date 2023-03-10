const db = require('../../db/models');
const {
  createContentType,
  updateContentType,
  createCollection,
  getAllContentTypes,
  getCollectionById,
  updateCollection,
  deleteCollection,
} = require('../../src/services/cms');

jest.mock('../../db/models', () => {
  const ContentType = {
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
  };

  const Content = {
    create: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
  };

  return {
    ContentType,
    Content,
  };
});

describe('createContentType', () => {
  const { ContentType } = db;

  it('should create a new content type', async () => {
    ContentType.create.mockResolvedValueOnce({ id: 1, name: 'Blog', fields: ['title', 'body'] });
    const contentType = await createContentType('Blog', ['title', 'body']);
    expect(contentType).toEqual({ id: 1, name: 'Blog', fields: ['title', 'body'] });
    expect(ContentType.create).toHaveBeenCalledTimes(1);
    expect(ContentType.create).toHaveBeenCalledWith({ name: 'Blog', fields: ['title', 'body'] });
  });
});

describe('updateContentType', () => {
  const { ContentType } = db;

  it('should update an existing content type', async () => {
    ContentType.update.mockResolvedValueOnce();
    ContentType.findOne.mockResolvedValueOnce({ id: 1, name: 'Blog', fields: ['title', 'body', 'author'] });
    const contentType = await updateContentType(1, 'Blog', ['title', 'body', 'author']);
    expect(contentType).toEqual({ id: 1, name: 'Blog', fields: ['title', 'body', 'author'] });
    expect(ContentType.update).toHaveBeenCalledTimes(1);
    expect(ContentType.update).toHaveBeenCalledWith({ name: 'Blog', fields: ['title', 'body', 'author'] }, { where: { id: 1 } });
    expect(ContentType.findOne).toHaveBeenCalledTimes(1);
    expect(ContentType.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});

describe('createCollection', () => {
  const { Content } = db;

  it('should create a new collection', async () => {
    Content.create.mockResolvedValueOnce({ id: 1, contentTypeId: 1, entry: { title: 'Hello World', body: 'This is my first blog post' } });
    const collection = await createCollection(1, { title: 'Hello World', body: 'This is my first blog post' });
    expect(collection).toEqual({ id: 1, contentTypeId: 1, entry: { title: 'Hello World', body: 'This is my first blog post' } });
    expect(Content.create).toHaveBeenCalledTimes(1);
    expect(Content.create).toHaveBeenCalledWith({ contentTypeId: 1, entry: { title: 'Hello World', body: 'This is my first blog post' } });
  });
});

describe('getAllContentTypes', () => {
  const { ContentType } = db;

  it('should return all content types', async () => {
    ContentType.findAll.mockResolvedValueOnce([{ id: 1, name: 'Blog', fields: ['title', 'body'] }, { id: 2, name: 'Page', fields: ['title', 'content'] }]);
    const contentTypes = await getAllContentTypes();
    expect(contentTypes).toEqual([{ id: 1, name: 'Blog', fields: ['title', 'body'] }, { id: 2, name: 'Page', fields: ['title', 'content'] }]);
    expect(ContentType.findAll).toHaveBeenCalledTimes(1);
  });
});

describe('getCollectionById', () => {
  const { Content } = db;

  it('should return all collections of a content type', async () => {
    Content.findAll.mockResolvedValueOnce([{ id: 1, contentTypeId: 1, entry: { title: 'Hello World', body: 'This is my first blog post' } }, { id: 2, contentTypeId: 1, entry: { title: 'Hello World', body: 'This is my second blog post' } }]);
    const collections = await getCollectionById(1);
    expect(collections).toEqual([{ id: 1, contentTypeId: 1, entry: { title: 'Hello World', body: 'This is my first blog post' } }, { id: 2, contentTypeId: 1, entry: { title: 'Hello World', body: 'This is my second blog post' } }]);
    expect(Content.findAll).toHaveBeenCalledTimes(1);
    expect(Content.findAll).toHaveBeenCalledWith({ where: { contentTypeId: 1 } });
  });
});

describe('updateCollection', () => {
  const { Content } = db;

  it('should update a collection', async () => {
    Content.update.mockResolvedValueOnce();
    Content.findOne.mockResolvedValueOnce({ id: 1, contentTypeId: 1, entry: { title: 'Hello World', body: 'This is my first blog post' } });
    const collection = await updateCollection(1, { title: 'Hello World', body: 'This is my first blog post' });
    expect(collection).toEqual({ id: 1, contentTypeId: 1, entry: { title: 'Hello World', body: 'This is my first blog post' } });
    expect(Content.update).toHaveBeenCalledTimes(1);
    expect(Content.update).toHaveBeenCalledWith({ entry: { title: 'Hello World', body: 'This is my first blog post' } }, { where: { id: 1 } });
    expect(Content.findOne).toHaveBeenCalledTimes(1);
    expect(Content.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});

describe('deleteCollection', () => {
  const { Content } = db;

  it('should delete a collection', async () => {
    Content.destroy.mockResolvedValueOnce();
    const collection = await deleteCollection(1);
    expect(collection).toEqual();
    expect(Content.destroy).toHaveBeenCalledTimes(1);
    expect(Content.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
