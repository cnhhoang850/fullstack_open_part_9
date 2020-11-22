type exerciseSchedule = Array<number>;
export const ratingDescriptions = [
  "You passed your goals",
  "You almost passed, not bad",
  "You can try harder next time"
];

interface exerciseValues {
  target: number;
  schedule: Array<number>;
}

interface exerciseRating {
  periodLength: number;
  trainningDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

const parseExerciseArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  for (let i = 3; i < args.slice(3, -1).length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error(`The ${i+1}th element in the schedule is not a numeric value`);
    }
  }
  return {
    target: Number(args[2]),
    schedule: args.slice(2,-1).map(value => Number(value))
  };
};


export const calculateExercises = (
  target: number,
  schedule: exerciseSchedule,
  ratingDescriptions: Array<string>
): exerciseRating => {
  const periodLength = schedule.length;

  let trainningDays = 0;
  let totalTrainningTime = 0;

  for (let i = 0; i < periodLength; i++) {
    if (schedule[i] === 0) {
      continue;
    } else {
      ++trainningDays;
      totalTrainningTime += schedule[i];
    }
  }

  const average = totalTrainningTime/periodLength;

  let rating;
  if (average === target || average > target) {
    rating = 1;
  } else if (Math.round(average*10)/10 === target) {
    rating = 2;
  } else {
    rating = 3;
  }

  const ratingDescription = ratingDescriptions[rating - 1];
  const success = rating === 3 ? false: true;

  return {
    periodLength,
    trainningDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const {target, schedule} = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, schedule, ratingDescriptions));
} catch(e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}
