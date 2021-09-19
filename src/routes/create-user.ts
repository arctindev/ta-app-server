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
  console.log(user)
  user
    .save()
    .then((data) => {
      console.log("Successfully created user");
      res.status(200).json({
        message: 'User created',
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
