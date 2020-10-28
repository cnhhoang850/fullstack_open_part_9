import express from 'express';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())

const PORT = 3003;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged');
  res.status(200).send('pong');
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
});