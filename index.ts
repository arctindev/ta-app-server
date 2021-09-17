import * as express from 'express';
import * as cors from 'cors';
import * as mongoose from 'mongoose';
import 'dotenv/config';
import { userDataRouter } from './src/routes/user-data';
import { authenticationRouter } from './src/routes/authentication';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static('build'));
app.use(cors());
app.use('/user-data', userDataRouter);
app.use('/authentication', authenticationRouter);

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});

mongoose.connect(`${process.env.DB_CONNECTION}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully to the database');
});

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
