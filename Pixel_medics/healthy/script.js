// Constants and Data
const CONSTANTS = {
    BMI_CATEGORIES: {
        UNDERWEIGHT: { max: 18.5, label: 'Underweight' },
        NORMAL: { max: 24.9, label: 'Normal weight' },
        OVERWEIGHT: { max: 29.9, label: 'Overweight' },
        OBESE: { min: 30, label: 'Obesity' }
    },
    REMINDER_INTERVAL: 3600000, // 1 hour in milliseconds
    DATE_OPTIONS: { 
        minDays: 1,  // Minimum days from today
        maxDays: 60  // Maximum days ahead for booking
    }
};

// Data Structures
const SYMPTOMS_MAP = {
    symptom1: "Frequent headaches",
    symptom2: "Unexplained fatigue",
    symptom3: "Chest pain",
    symptom4: "Swelling in the body",
    symptom5: "Frequent urination",
    symptom6: "Blurred vision",
    symptom7: "Nausea",
    symptom8: "Abdominal pain",
    symptom9: "Weight loss"
};

const DISEASES_MAP = {
    "Frequent headaches": ["Migraine", "Stress", "Brain tumor"],
    "Unexplained fatigue": ["Chronic fatigue syndrome", "Sleep apnea", "Depression"],
    "Chest pain": ["Heart disease", "GERD", "Pneumonia"],
    "Swelling in the body": ["Heart failure", "Kidney disease", "Liver disease"],
    "Frequent urination": ["Diabetes", "Urinary tract infection (UTI)", "Bladder issues"],
    "Blurred vision": ["Diabetes", "Glaucoma", "Cataracts"],
    "Nausea": ["Food poisoning", "Gastroenteritis", "Pregnancy"],
    "Abdominal pain": ["Appendicitis", "Ulcer", "IBS"],
    "Weight loss": ["Cancer", "Hyperthyroidism", "Diabetes"]
};

const MENTAL_HEALTH_QUESTIONS = {
    stress1: "Do you feel anxious or nervous often?",
    stress2: "Do you experience mood swings?",
    stress3: "Do you feel overwhelmed by stress?",
    stress4: "Do you have trouble sleeping?"
};

const MENTAL_HEALTH_CONDITIONS = {
    "Do you feel anxious or nervous often?": "Anxiety disorder",
    "Do you experience mood swings?": "Bipolar disorder",
    "Do you feel overwhelmed by stress?": "Stress-related issues",
    "Do you have trouble sleeping?": "Insomnia, Stress"
};

// Utility Functions
const safeQuerySelector = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }
    return element;
};

const displayResult = (elementId, content) => {
    try {
        const element = safeQuerySelector(elementId);
        element.innerHTML = content;
    } catch (error) {
        console.error(`Error displaying result: ${error.message}`);
    }
};

// Disease Survey Handler
class DiseaseSurvey {
    static handleSubmit(event) {
        event.preventDefault();

        try {
            const selectedSymptoms = Object.keys(SYMPTOMS_MAP)
                .filter(symptom => {
                    const input = document.querySelector(`input[name="${symptom}"]:checked`);
                    return input && input.value === "yes";
                })
                .map(symptom => SYMPTOMS_MAP[symptom]);

            const possibleDiseases = new Set(
                selectedSymptoms.flatMap(symptom => DISEASES_MAP[symptom] || [])
            );

            const resultMessage = possibleDiseases.size > 0
                ? `<strong>Possible Diseases:</strong> ${Array.from(possibleDiseases).join(", ")}`
                : "No significant symptoms selected. Please consider consulting a healthcare provider for further evaluation.";

            displayResult("#diseaseResult", resultMessage);
        } catch (error) {
            console.error("Error in disease survey:", error);
            displayResult("#diseaseResult", "An error occurred while processing your symptoms.");
        }
    }
}

// BMI Calculator Handler
class BMICalculator {
    static validateInputs(weight, height) {
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            throw new Error("Invalid weight or height values");
        }
    }

    static calculateBMI(weight, height) {
        return weight / (height * height);
    }

    static getBMICategory(bmi) {
        const { UNDERWEIGHT, NORMAL, OVERWEIGHT, OBESE } = CONSTANTS.BMI_CATEGORIES;
        
        if (bmi < UNDERWEIGHT.max) return UNDERWEIGHT.label;
        if (bmi <= NORMAL.max) return NORMAL.label;
        if (bmi <= OVERWEIGHT.max) return OVERWEIGHT.label;
        return OBESE.label;
    }

    static handleSubmit(event) {
        event.preventDefault();

        try {
            const weight = parseFloat(safeQuerySelector("#weight").value);
            const height = parseFloat(safeQuerySelector("#height").value) / 100;

            this.validateInputs(weight, height);
            const bmi = this.calculateBMI(weight, height);
            const category = this.getBMICategory(bmi);

            safeQuerySelector("#bmiValue").textContent = bmi.toFixed(2);
            safeQuerySelector("#bmiCategory").textContent = `Category: ${category}`;
            safeQuerySelector("#bmiResult").style.display = "block";
        } catch (error) {
            alert(`BMI Calculation Error: ${error.message}`);
        }
    }
}

// Mental Health Survey Handler
class MentalHealthSurvey {
    static handleSubmit(event) {
        event.preventDefault();

        try {
            const selectedIssues = Object.keys(MENTAL_HEALTH_QUESTIONS)
                .filter(question => {
                    const input = document.querySelector(`input[name="${question}"]:checked`);
                    return input && input.value === "yes";
                })
                .map(question => MENTAL_HEALTH_QUESTIONS[question]);

            const mentalHealthIssues = new Set(
                selectedIssues.map(issue => MENTAL_HEALTH_CONDITIONS[issue])
            );

            const resultMessage = mentalHealthIssues.size > 0
                ? `<strong>Your Possible Mental Health Issues:</strong> ${Array.from(mentalHealthIssues).join(", ")}`
                : "You seem to be in good mental health, but regular monitoring is recommended.";

            displayResult("#mentalHealthResult", resultMessage);
        } catch (error) {
            console.error("Error in mental health survey:", error);
            displayResult("#mentalHealthResult", "An error occurred while processing your responses.");
        }
    }
}

// Hydration Reminder Handler
class HydrationReminder {
    static async initialize() {
        try {
            if (Notification.permission !== "granted") {
                const permission = await Notification.requestPermission();
                if (permission !== "granted") {
                    console.warn("Notification permission denied");
                    return;
                }
            }

            setInterval(() => {
                new Notification("Stay hydrated!", {
                    body: "Reminder: Drink a glass of water.",
                    icon: "/path/to/water-icon.png" // Add appropriate icon path
                });
            }, CONSTANTS.REMINDER_INTERVAL);
        } catch (error) {
            console.error("Error setting up hydration reminder:", error);
        }
    }
}

// Appointment Booking Handler
class AppointmentBooking {
    static validateAppointmentDate(date) {
        const selectedDate = new Date(date);
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + CONSTANTS.DATE_OPTIONS.maxDays);

        if (selectedDate < today || selectedDate > maxDate) {
            throw new Error(`Please select a date between tomorrow and ${CONSTANTS.DATE_OPTIONS.maxDays} days from now`);
        }
    }

    static handleSubmit(event) {
        event.preventDefault();

        try {
            const name = safeQuerySelector("#name").value.trim();
            const appointmentDate = safeQuerySelector("#appointmentDate").value;
            const appointmentTime = safeQuerySelector("#appointmentTime").value;

            if (!name || !appointmentDate || !appointmentTime) {
                throw new Error("Please fill all required fields");
            }

            this.validateAppointmentDate(appointmentDate);

            alert(`Appointment booked successfully for ${name} on ${appointmentDate} at ${appointmentTime}.`);
            safeQuerySelector("#appointmentForm").reset();
        } catch (error) {
            alert(`Booking Error: ${error.message}`);
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    try {
        safeQuerySelector("#diseaseForm").addEventListener("submit", DiseaseSurvey.handleSubmit);
        safeQuerySelector("#bmiForm").addEventListener("submit", BMICalculator.handleSubmit.bind(BMICalculator));
        safeQuerySelector("#mentalHealthForm").addEventListener("submit", MentalHealthSurvey.handleSubmit);
        safeQuerySelector("#appointmentForm").addEventListener("submit", AppointmentBooking.handleSubmit.bind(AppointmentBooking));
        
        // Initialize hydration reminder
        HydrationReminder.initialize();
    } catch (error) {
        console.error("Error initializing application:", error);
    }
});
