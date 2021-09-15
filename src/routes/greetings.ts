import * as express from 'express';

const router = express.Router();

router.use(express.json());

router.get('/hello', (req, res) => {
  res.status(200).json('Welcome, this is server!');
});

router.get('/*', (req, res) => {
  res.status(404).json('Hello, but this route was not found');
});

export const greetingsRouter = router;
