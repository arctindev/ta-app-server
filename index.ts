import * as express from 'express';
import * as cors from 'cors';

const app = express();
const DEVELOPMENT = true;

const PORT = process.env.PORT || 5000;
app.use(express.static('build'));
app.use(express.json());

if(DEVELOPMENT) {
  app.use(cors());
}

app.get('/endpoint/hello', (req, res) => {
  res.status(200).json('Welcome, this is server!');
});

app.get('/endpoint/*', (req, res) => {
    res.status(404).json('Error, not found');
  });


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/build/index.html')
  })
  
app.get('/*', (req,res) => {
    res.sendFile(__dirname + '/build/404.html')
  })
  

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
