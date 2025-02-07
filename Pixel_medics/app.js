document.addEventListener("DOMContentLoaded", function () {
    const healthSurvey = document.getElementById("healthSurvey");
    const diseaseSurvey = document.getElementById("diseaseSurvey");
    const mentalHealthSurvey = document.getElementById("mentalHealthSurvey");
    const resultDiv = document.getElementById("result");
    const diseaseResultDiv = document.getElementById("diseaseResult");
    const mentalHealthResultDiv = document.getElementById("mentalHealthResult");
    const dietPlanDiv = document.getElementById("dietPlan");

    const diseaseMapping = {
        "fever,cough,fatigue": ["COVID-19", "Flu"],
        "headache,nausea": ["Migraine", "Food Poisoning"],
        "chest pain,shortness of breath": ["Heart Attack", "Angina"],
        "fatigue,weight loss,night sweats": ["Tuberculosis", "Cancer"],
        "insomnia,anxiety": ["Stress", "Generalized Anxiety Disorder"],
    };

    healthSurvey.addEventListener("submit", function (event) {
        event.preventDefault();

        const height = parseFloat(document.getElementById("height").value);
        const weight = parseFloat(document.getElementById("weight").value);
        const age = parseInt(document.getElementById("age").value);

        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
        const category = bmi < 18.5 ? "Underweight" : bmi < 24.9 ? "Normal" : "Overweight/Obese";

        resultDiv.innerHTML = `<h3>Your BMI: ${bmi} (${category})</h3>`;
        generateChart(bmi);
    });

    diseaseSurvey.addEventListener("submit", function (event) {
        event.preventDefault();
        const selected = Array.from(document.querySelectorAll('input[name="symptoms"]:checked'))
                              .map(symptom => symptom.value);

        let matches = [];
        for (let key in diseaseMapping) {
            const symptoms = key.split(",");
            if (selected.some(s => symptoms.includes(s))) matches.push(...diseaseMapping[key]);
        }

        diseaseResultDiv.innerHTML = matches.length > 0
            ? `<h3>Possible Diseases: ${[...new Set(matches)].join(", ")}</h3>`
            : `<h3>No diseases detected. Please consult a doctor for accurate diagnosis.</h3>`;
    });

    mentalHealthSurvey.addEventListener("submit", function (event) {
        event.preventDefault();
        const mentalSymptoms = Array.from(document.querySelectorAll('input[name="mentalSymptoms"]:checked'))
                                    .map(symptom => symptom.value);

        const recommendations = mentalSymptoms.length > 0
            ? `<p>You might be experiencing symptoms of stress or anxiety. Try relaxation techniques like yoga or meditation, and ensure proper sleep and nutrition.</p>`
            : `<p>No significant mental health issues detected.</p>`;

        mentalHealthResultDiv.innerHTML = `<h3>Mental Health Assessment</h3>${recommendations}`;
    });

    dietPlanDiv.innerHTML = `
        <p><strong>Diet Plan:</strong> Eat a balanced diet with fruits, vegetables, lean protein, and whole grains. Stay hydrated.</p>
        <p><strong>Do's:</strong> Exercise regularly, get enough sleep, and manage stress.</p>
        <p><strong>Don'ts:</strong> Avoid excessive sugar, processed foods, and alcohol.</p>
    `;

    function generateChart(bmi) {
        const ctx = document.getElementById("healthMetrics").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Your BMI"],
                datasets: [{
                    label: "BMI Score",
                    data: [bmi],
                    backgroundColor: "#4CAF50",
                }],
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, max: 40 },
                },
            },
        });
    }
});
