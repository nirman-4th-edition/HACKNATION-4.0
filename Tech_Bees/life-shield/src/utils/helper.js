export function calculateBMI(weight, height) {
  height = height / 100;

  let val = weight / (height * height);
  let bmi = val.toFixed(2);

  let category = "";
  let icon = "";
  if (bmi < 18.5) {
    category = "Underweight";
    icon = "😢";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal weight";
    icon = "😊";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    icon = "😞";
  } else {
    category = "Obese";
    icon = "😢";
  }

  return { bmi, message: category, icon };
}
