import * as express from 'express';
import { Person } from '../models/person';

const router = express.Router();

router.use(express.json());

router.get('/:id', (req, res) => {
    Person.findById(req.params.id)
      .then((data) => {
        res.status(200).json({
          data: data,
        });
      })
      .catch((err) => {
        console.log('DB ERROR! ', err);
        res.status(404).json({
          message: "Couldn't find a data",
        });
      });
  });

router.get('/', (req, res) => {
  Person.find()
    .then((data) => {
      res.status(200).json({
        data: data,
      });
    })
    .catch((err) => {
      console.log('DB ERROR! ', err);
      res.status(404).json({
        message: "Couldn't find a data",
      });
    });
});

router.post('/', (req, res) => {
  const person = new Person({
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
  });

  person
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

export const personRouter = router;
