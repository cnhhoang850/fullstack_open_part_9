export type bmiCategories =
  | "Normal (healthy weight)"
  | "Skinny (unhealthy weight)"
  | "Obese (unhealthy weight)"
  | undefined;

interface bodyIndexes {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): bodyIndexes => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}



export const bmiCalculate = (height: number, weight: number): bmiCategories => {
  const BMI = weight/(height/100*height/100);

  if (BMI >= 25) {
    return "Obese (unhealthy weight)";
  } else if (BMI < 25 && BMI > 15) {
    return "Normal (healthy weight)";
  } else if (BMI <= 15) {
    return "Skinny (unhealthy weight)"
  }
  return
}

try {
  const {height, weight} = parseArguments(process.argv)
  console.log(bmiCalculate(height, weight))
} catch(e) {
  console.log('Error, something bad happened, message: ', e.message);
}
