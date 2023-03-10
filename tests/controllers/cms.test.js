const cmsController = require('../../src/controllers/cms');
const cmsService = require('../../src/services/cms');

jest.mock('../../src/services/cms');

describe('CMS Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('createContentType', () => {
  it('should create a new content type', async () => {
    const req = { body: { name: 'blog', fields: [{ name: 'title', type: 'string' }] } };
    const contentType = { id: 1, name: 'blog', fields: [{ name: 'title', type: 'string' }] };
    cmsService.createContentType.mockResolvedValue(contentType);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.createContentType(req, res);

    expect(cmsService.createContentType).toHaveBeenCalledWith('blog', [{ name: 'title', type: 'string' }]);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(contentType);
  });

  it('should return 500 if there is an error', async () => {
    const req = { body: { name: 'blog', fields: [{ name: 'title', type: 'string' }] } };
    const errorMessage = 'Error creating content type';
    cmsService.createContentType.mockRejectedValue(new Error(errorMessage));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.createContentType(req, res);

    expect(cmsService.createContentType).toHaveBeenCalledWith('blog', [{ name: 'title', type: 'string' }]);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('updateContentType', () => {
  it('should update an existing content type', async () => {
    const req = { params: { id: 1 }, body: { name: 'blog', fields: [{ name: 'title', type: 'string' }] } };
    const contentType = { id: 1, name: 'blog', fields: [{ name: 'title', type: 'string' }] };
    cmsService.updateContentType.mockResolvedValue(contentType);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.updateContentType(req, res);

    expect(cmsService.updateContentType).toHaveBeenCalledWith(1, 'blog', [{ name: 'title', type: 'string' }]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(contentType);
  });

  it('should return 500 if there is an error', async () => {
    const req = { params: { id: 1 }, body: { name: 'blog', fields: [{ name: 'title', type: 'string' }] } };
    const errorMessage = 'Error updating content type';
    cmsService.updateContentType.mockRejectedValue(new Error(errorMessage));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.updateContentType(req, res);

    expect(cmsService.updateContentType).toHaveBeenCalledWith(1, 'blog', [{ name: 'title', type: 'string' }]);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('createCollection', () => {
  it('should create a new collection', async () => {
    const req = { body: { contentTypeId: 1, entry: { title: 'My first blog post' } } };
    const collection = { id: 1, contentTypeId: 1, entry: { title: 'My first blog post' } };
    cmsService.createCollection.mockResolvedValue(collection);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.createCollection(req, res);

    expect(cmsService.createCollection).toHaveBeenCalledWith(1, { title: 'My first blog post' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(collection);
  });

  it('should return 500 if there is an error', async () => {
    const req = { body: { contentTypeId: 1, entry: { title: 'My first blog post' } } };
    const errorMessage = 'Error creating collection';
    cmsService.createCollection.mockRejectedValue(new Error(errorMessage));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.createCollection(req, res);

    expect(cmsService.createCollection).toHaveBeenCalledWith(1, { title: 'My first blog post' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getAllContentTypes', () => {
  it('should get all content types', async () => {
    const contentTypes = [{ id: 1, name: 'blog', fields: [{ name: 'title', type: 'string' }] }];
    cmsService.getAllContentTypes.mockResolvedValue(contentTypes);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.getAllContentTypes({}, res);

    expect(cmsService.getAllContentTypes).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(contentTypes);
  });

  it('should return 500 if there is an error', async () => {
    const errorMessage = 'Error getting all content types';
    cmsService.getAllContentTypes.mockRejectedValue(new Error(errorMessage));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.getAllContentTypes({}, res);

    expect(cmsService.getAllContentTypes).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getAllCollections', () => {
  it('should get all collections', async () => {
    const collections = [{ id: 1, contentTypeId: 1, entry: { title: 'My first blog post' } }];
    cmsService.getAllCollections.mockResolvedValue(collections);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.getAllCollections({}, res);

    expect(cmsService.getAllCollections).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(collections);
  });

  it('should return 500 if there is an error', async () => {
    const errorMessage = 'Error getting all collections';
    cmsService.getAllCollections.mockRejectedValue(new Error(errorMessage));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.getAllCollections({}, res);

    expect(cmsService.getAllCollections).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getCollection', () => {
  it('should get a collection', async () => {
    const collection = { id: 1, contentTypeId: 1, entry: { title: 'My first blog post' } };
    cmsService.getCollection.mockResolvedValue(collection);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.getCollection({ params: { id: 1 } }, res);

    expect(cmsService.getCollection).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(collection);
  });

  it('should return 500 if there is an error', async () => {
    const errorMessage = 'Error getting collection';
    cmsService.getCollection.mockRejectedValue(new Error(errorMessage));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.getCollection({ params: { id: 1 } }, res);

    expect(cmsService.getCollection).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('updateCollection', () => {
  it('should update a collection', async () => {
    const req = { params: { id: 1 }, body: { contentTypeId: 1, entry: { title: 'My first blog post' } } };
    const collection = { id: 1, contentTypeId: 1, entry: { title: 'My first blog post' } };
    cmsService.updateCollection.mockResolvedValue(collection);
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.updateCollection(req, res);

    expect(cmsService.updateCollection).toHaveBeenCalledWith(1, 1, { title: 'My first blog post' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(collection);
  });

  it('should return 500 if there is an error', async () => {
    const req = { params: { id: 1 }, body: { contentTypeId: 1, entry: { title: 'My first blog post' } } };
    const errorMessage = 'Error updating collection';
    cmsService.updateCollection.mockRejectedValue(new Error(errorMessage));
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await cmsController.updateCollection(req, res);

    expect(cmsService.updateCollection).toHaveBeenCalledWith(1, 1, { title: 'My first blog post' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('CMS Controller', () => {
  describe('createContentType', () => {
    it('should create a new content type and return the content type object', async () => {
      const req = { body: { name: 'testContent', fields: [{ name: 'testField', type: 'text' }] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const contentType = { _id: '123', name: 'testContent', fields: [{ name: 'testField', type: 'text' }] };
      cmsService.createContentType.mockResolvedValueOnce(contentType);

      await cmsController.createContentType(req, res);

      expect(cmsService.createContentType).toHaveBeenCalledWith('testContent', [{ name: 'testField', type: 'text' }]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(contentType);
    });

    it('should return a 500 status code if an error occurs', async () => {
      const req = { body: { name: 'testContent', fields: [{ name: 'testField', type: 'text' }] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error('Internal server error');
      cmsService.createContentType.mockRejectedValueOnce(error);

      await cmsController.createContentType(req, res);

      expect(cmsService.createContentType).toHaveBeenCalledWith('testContent', [{ name: 'testField', type: 'text' }]);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('updateContentType', () => {
    it('should update the specified content type and return the updated content type object', async () => {
      const req = { params: { id: '123' }, body: { name: 'updatedContent', fields: [{ name: 'updatedField', type: 'text' }] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const contentType = { _id: '123', name: 'updatedContent', fields: [{ name: 'updatedField', type: 'text' }] };
      cmsService.updateContentType.mockResolvedValueOnce(contentType);

      await cmsController.updateContentType(req, res);

      expect(cmsService.updateContentType).toHaveBeenCalledWith('123', 'updatedContent', [{ name: 'updatedField', type: 'text' }]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(contentType);
    });

    it('should return a 500 status code if an error occurs', async () => {
      const req = { params: { id: '123' }, body: { name: 'updatedContent', fields: [{ name: 'updatedField', type: 'text' }] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error('Internal server error');
      cmsService.updateContentType.mockRejectedValueOnce(error);

      await cmsController.updateContentType(req, res);

      expect(cmsService.updateContentType).toHaveBeenCalledWith('123', 'updatedContent', [{ name: 'updatedField', type: 'text' }]);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});

describe('CMS Controller', () => {
  describe('createContentType', () => {
    it('should create a new content type and return the content type object', async () => {
      const req = { body: { name: 'testContent', fields: [{ name: 'testField', type: 'text' }] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const contentType = { _id: '123', name: 'testContent', fields: [{ name: 'testField', type: 'text' }] };
      cmsService.createContentType.mockResolvedValueOnce(contentType);

      await cmsController.createContentType(req, res);

      expect(cmsService.createContentType).toHaveBeenCalledWith('testContent', [{ name: 'testField', type: 'text' }]);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(contentType);
    });

    it('should return a 500 status code if an error occurs', async () => {
      const req = { body: { name: 'testContent', fields: [{ name: 'testField', type: 'text' }] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error('Internal server error');
      cmsService.createContentType.mockRejectedValueOnce(error);

      await cmsController.createContentType(req, res);

      expect(cmsService.createContentType).toHaveBeenCalledWith('testContent', [{ name: 'testField', type: 'text' }]);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('updateContentType', () => {
    it('should update the specified content type and return the updated content type object', async () => {
      const req = { params: { id: '123' }, body: { name: 'updatedContent', fields: [{ name: 'updatedField', type: 'text' }] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const contentType = { _id: '123', name: 'updatedContent', fields: [{ name: 'updatedField', type: 'text' }] };
      cmsService.updateContentType.mockResolvedValueOnce(contentType);

      await cmsController.updateContentType(req, res);

      expect(cmsService.updateContentType).toHaveBeenCalledWith('123', 'updatedContent', [{ name: 'updatedField', type: 'text' }]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(contentType);
    });

    it('should return a 500 status code if an error occurs', async () => {
      const req = { params: { id: '123' }, body: { name: 'updatedContent', fields: [{ name: 'updatedField', type: 'text' }] } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error('Internal server error');
      cmsService.updateContentType.mockRejectedValueOnce(error);
    });
  });
});
