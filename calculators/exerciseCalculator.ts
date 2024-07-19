import { isNotNumber } from "./utils";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number; 
  success: boolean; 
  rating: number; 
  ratingDescription: string; 
  target: number;
  average: number;  
}

interface Exercise { 
  dailyHours: number[], 
  target: number
}

const parseArguments = (args: string[]): Exercise => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const hours = [];
  for(let i = 3; i < args.length; i++) {
    if(isNotNumber(args[i])) {
      throw new Error('Provided values were not numbers!');
    }
    hours.push(Number(args[i]));
  }
  return {
    dailyHours: hours,
    target: Number(args[2])
  };
};

export const calculateExercises = (dailyHours: number[], target: number): ExerciseResult => {
  const periodLength = dailyHours.length;
  let trainingDays = 0;
  let success = false; 
  let ratingDescription = 'not too bad but could be better';
  let rating = 2;
  dailyHours.forEach(dh => {
    if(dh > 0) {
      ++trainingDays;
    }
  });
  const average = dailyHours.reduce((a, b) => a + b) / periodLength;
  if (average > target) {
    success = true; 
  }
  if(average < 1.5) {
    rating = 1; 
    ratingDescription = 'bad';
  }
  else if(average > 2) {
    rating = 3;
    ratingDescription = 'good';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};
try {
  const {dailyHours, target} = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if(error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}