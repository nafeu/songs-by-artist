import express from 'express';

const api = express.Router();

api.get('/test', (req, res) => {
  res.status(200).send('OK');
});

export default api;
