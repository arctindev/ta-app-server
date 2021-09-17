import * as express from 'express';
import { userData } from '../data/userData';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.use(express.json());

router.post('/login/', (req, res) => {
  const userLogin = userData.filter((item) => item.login === req.body.login);
  if (!userLogin[0]) {
    return res.status(401).json({
      message: 'Bad User Data',
    });
  }

  if (userLogin[0].password === req.body.pass) {
    userLogin[0].token = uuidv4();
    return res.status(200).json({
      message: 'Success',
      token: userLogin[0].token,
    });
  } else {
    return res.status(401).json({
      message: 'Bad User Data',
    });
  }
});

router.get('/*', (req, res) => {
  res.status(404).json('Hello, but this route was not found');
});

export const authenticationRouter = router;
