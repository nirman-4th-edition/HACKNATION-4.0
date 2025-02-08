from predict_params import train_ai_model, predict_using_model

gender = "m"
gender = 0 if gender.lower() == "m" else 1
age = 43
diabetes = 0
asthma = 0
heart_disease = 0
modai, scal = train_ai_model()

res = predict_using_model(modai, scal, gender, age, diabetes, asthma, heart_disease)


def res_give():
    return res


