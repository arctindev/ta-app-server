import * as express from 'express';
import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.use(express.json());

router.post('/login/', (req, res) => {
  User.findOne({ email: req.body.login })
    .then((data: any) => {
      if (data.password === req.body.pass) {
        console.log('Login Success');
        const token = uuidv4();
        User.updateOne(
          {
            _id: data._id,
          },
          { token: token }
        )
          .then((data) => {
            console.log('Succesfuly changed token', data);
          })
          .catch((err) => {
            console.log('Something went wrong, couldnt add user token', err);
          });

        return res.status(200).json({
          message: 'Success',
          token: token,
          me: data._id,
        });
      } else {
        console.log('Login Failed, bad password');
        return res.status(401).json({
          message: 'Invalid user data',
        });
      }
    })
    .catch((err) => {
      console.log('Login Failed', err);
      return res.status(401).json({
        message: 'Invalid user data',
      });
    });
});

router.get('/*', (req, res) => {
  res.status(404).json('Hello, but this route was not found');
});

export const authenticationRouter = router;
