import * as express from 'express';
import { userData } from '../data/userData';

const router = express.Router();

router.use(express.json());

router.get('/history/', (req, res) => {
  const user = userData.filter((item) => item.token === req.headers.authorization);
  const data = user[0];
  res.status(200).json({
    data: data.data,
  });
});

router.get('/history/:id', (req, res) => {
  const user = userData.filter((item) => item.token === req.headers.authorization);
  const data = user[0].data.filter((item) => item.id === req.params.id);
  res.status(200).json({
    data: data,
  });
});

router.get('/*', (req, res) => {
  res.status(404).json('Hello, but this route was not found');
});

export const userDataRouter = router;
