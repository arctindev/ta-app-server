import * as express from 'express';
import { userData } from '../data/userData';
import { Service } from '../models/service';
import { User } from '../models/user';
import { Day } from '../models/day';

const router = express.Router();

router.use(express.json());

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
      if (data.data.length > 0) {
        if (data.data.filter((item: any) => item.date === date).length == 1) {
          User.updateOne(
            {
              _id: req.headers.userid,
              token: req.headers.authorization,
              'data.date': date,
            },
            { $push: { 'data.$.data': service } }
          )
            .then((data) => {
              console.log('Service Data succesfully pushed to DB :)', data);
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

router.get('/history/', (req, res) => {
  const user = userData.filter(
    (item) => item.token === req.headers.authorization
  );
  const data = user[0];

  res.status(200).json({
    data: data.data,
  });
});

router.get('/history/:id', (req, res) => {
  const user = userData.filter(
    (item) => item.token === req.headers.authorization
  );
  const data = user[0].data.filter((item) => item.id === req.params.id);

  res.status(200).json({
    data: data,
  });
});

router.get('/*', (req, res) => {
  res.status(404).json('Hello, but this route was not found');
});

export const userDataRouter = router;
