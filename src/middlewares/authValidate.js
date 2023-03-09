const axios = require('axios');

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const { data } = await axios.get('http://localhost:8000/validate', {
      headers: { authorization },
    });
    if (data) {
      const { id, role } = data;
      req.user = { id, role };
      return next();
    }
    throw new Error();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { authenticate };
