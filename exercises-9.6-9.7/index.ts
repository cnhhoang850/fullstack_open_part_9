import express from 'express';
import {bmiCalculate} from './bmiCalculator';
import {ratingDescriptions, calculateExercises} from './exerciseCalculator';


const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({
      error: 'malformatted parameters'
    });
    return;
  } else {
    res.json({
      height,
      weight,
      bmi: bmiCalculate(height, weight)
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line 
  const target = req.body.target;
  // eslint-disable-next-line 
  const schedule = req.body.daily_exercises;

  if (!Array.isArray(schedule) || typeof(target) !== 'number') {
    res.json({
      error: 'malformatted parameters'
    });
    return;
  } else {
    const result = calculateExercises(target, schedule, ratingDescriptions);
    res.json({...result});
  }
});

const PORT = 3003;
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`);
});