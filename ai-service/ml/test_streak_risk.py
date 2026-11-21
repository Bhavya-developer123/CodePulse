
import joblib

import pandas as pd

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "artifacts" / "streak_risk_model.joblib"


print("Loading trained model...")

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        "Model not found. Run train_streak_risk.py first."
    )

model_data = joblib.load(MODEL_PATH)

model = model_data["model"]

features = model_data["features"]

print("Model loaded successfully!")


user_activity = {
    "active_days_last_7": 1,
    "problems_last_7": 1,
    "days_since_last_solve": 5,
    "current_streak": 1,
    "avg_problems_per_day": 0.2
}


input_data = pd.DataFrame(
    [user_activity],
    columns=features
)

prediction = model.predict(input_data)[0]

probabilities = model.predict_proba(input_data)[0]

risk_class_index = list(model.classes_).index(1)

risk_probability = probabilities[risk_class_index]


print("\nCodePulse Streak Risk Prediction")
print("--------------------------------")

print("User Activity:")

print(input_data.to_string(index=False))

print("\nPrediction:")

if prediction == 1:
    print("Streak Break Risk Detected!")
else:
    print("No Immediate Streak Break Risk Detected.")

print(f"Risk Probability: {risk_probability * 100:.2f}%")
