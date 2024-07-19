import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber } from "./utils";
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {weight, height} = req.query;
  if(!weight || !height || isNotNumber(weight as string) ||isNotNumber(height as string)) {
    res.status(400).json({error: "malformatted parameters"});
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({
    weight: Number(weight), 
    height: Number(height), 
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyHours, target } = req.body;
  if(!dailyHours || !target) {
    return res.status(400).json({error: "parameters missing"});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if(!Array.isArray(dailyHours) || isNotNumber(target)) {
    return res.status(400).json({error: "malformatted parameters"});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (dailyHours as string[]).forEach(
    (num: string) => {
    if(isNotNumber(num)) {
      return res.status(400).json({error: "malformatted parameters"});
    }
    return; 
  });
   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(dailyHours, target);
  return res.send({result});
});

const PORT = 3003; 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});