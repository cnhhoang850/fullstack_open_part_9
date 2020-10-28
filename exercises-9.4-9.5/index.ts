import express from 'express'
import {bmiCalculate} from './bmiCalculator'

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  console.log(req.query);
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({
      error: 'malformatted parameters'
    })
    return
  } else {
    res.json({
      height,
      weight,
      bmi: bmiCalculate(height, weight)
    });
  }
})

const PORT = 3003;
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})