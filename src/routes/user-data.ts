import * as express from 'express';
import { Service } from '../models/service';
import { User } from '../models/user';
import { Day } from '../models/day';

const router = express.Router();

router.use(express.json());

// ==============================
//            Routes
//  1: add-service
//  2: history
//  3: history/today
//  4: history/:id
//  =============================

// ==============================
// 1: add-service
// ==============================

router.post('/add-service/', (req, res) => {
  const service = new Service({
    name: req.body.name,
    surname: req.body.surname,
    service: req.body.service,
    hour: req.body.hour,
  });
  const date = req.body.date.join('-');

  User.findOne({ _id: req.headers.userid, token: req.headers.authorization })
    .then((data: any) => {
      //  |
      //  |
      // \|/ Checking if user is adding service to already existing day
      if (
        data.data.length > 0 &&
        data.data.filter((item: any) => item.date === date).length == 1
      ) {
        User.updateOne(
          {
            _id: req.headers.userid,
            token: req.headers.authorization,
            'data.date': date,
          },
          { $push: { 'data.$.data': service } }
        )
          .then((data) => {
            console.log('Service data succesfully pushed to DB :)', data);
            return res.status(200).json({
              message: 'Successfully added service to Db',
            });
          })
          .catch((err) => {
            console.log(
              'Somethings was wrong with adding new service existing day in db',
              err
            );
            return res.status(500).json({
              message: 'Somethings was wrong with creating new service to db',
            });
          });
      } else {
        const day = new Day({
          date: date,
          data: [service],
        });

        User.updateOne(
          { _id: req.headers.userid, token: req.headers.authorization },
          { $push: { data: day } }
        )
          .then((data) => {
            console.log(
              'New Day created and data succesfully pushed to DB :)',
              data
            );
            return res.status(200).json({
              message: 'New Day created and data succesfully pushed to DB :)',
            });
          })
          .catch((err) => {
            console.log(
              'Somethings was wrong with creating new day in db',
              err
            );
            return res.status(500).json({
              message: 'Somethings was wrong with creating new day in db',
            });
          });
      }
    })
    .catch((err) => {
      console.log('DB error, couldnt find user data', err);
      res.status(404).json({
        message: "Couldn't find User Data",
      });
    });
});

// ==============================
// 2: history
// ==============================

router.get('/history/', (req, res) => {
  User.findOne({ _id: req.headers.userid, token: req.headers.authorization })
    .then((data: any) => {
        res.status(200).json({
          data: data.data,
        });
    })
    .catch((err) => {
      console.log('Something went wrong with getting user history data', err);
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
});

// ==============================
// 3: history/today
// ==============================

router.get('/history/today', (req, res) => {
  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getUTCMonth() + 1 >= 10
      ? date.getUTCMonth() + 1
      : `0${date.getUTCMonth() + 1}`
  }-${date.getUTCDate()}`;

  User.findOne({
    _id: req.headers.userid,
    token: req.headers.authorization,
  })
    .then((data: any) => {
      const result = data.data.filter(
        (item: any) => `${item.date}` === `${today}`
      );
      console.log('User succesfuly gets data for today services');
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      console.log(
        'Something went wrong with getting user today service data',
        err
      );
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
});

// ==============================
// 4: history/:id
// ==============================

router.get('/history/:id', (req, res) => {
  User.findOne({
    _id: req.headers.userid,
    token: req.headers.authorization,
  })
    .then((data: any) => {
      const result = data.data.filter(
        (item: any) => `${item._id}` === `${req.params.id}`
      );
      console.log('User succesfuly gets history data');
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      console.log('Something went wrong with getting user history data', err);
      res.status(500).json({
        message: 'Something went wrong',
      });
    });
});

router.get('/*', (req, res) => {
  res.status(404).json('Hello, but this route was not found');
});

export const userDataRouter = router;
