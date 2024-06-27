let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

function sumSalaries(salaries) {
  const values = Object.values(salaries);
  let sum = 0;
  for (const value of values) {
    sum += value;
  }
  return sum;
}
console.log(sumSalaries({}));
