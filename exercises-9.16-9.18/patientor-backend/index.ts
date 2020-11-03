import express from 'express';
import patientsRouter from './routers/patientsRouter';
import diagnosesRouter from './routers/diagnosesRouter';

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3003;

app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged');
  res.status(200).send('pong');
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
});