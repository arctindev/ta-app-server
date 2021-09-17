import * as express from 'express';
import { User } from '../models/user';

const router = express.Router();

router.use(express.json());

router.post('/', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    token: '',
  });

  user
    .save()
    .then((data) => {
      res.status(200).json({
        message: 'Creating person',
        person: data,
      });
    })
    .catch((err) => {
      console.log('DB ERROR! ', err);
      res.status(500).json({
        message: 'Server error',
      });
    });
});

export const createUserRouter = router;
