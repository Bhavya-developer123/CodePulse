
import pandas as pd

from app.schemas.ml_streak_prediction import (
    MLStreakPredictionRequest,
    MLStreakPredictionResponse,
)

from app.services.ml_model_service import load_model_artifact


def predict_ml_streak_risk(
    data: MLStreakPredictionRequest,
) -> MLStreakPredictionResponse:

    # Step 1: Load trained Random Forest model
    artifact = load_model_artifact("streak_risk_model.joblib")

    model = artifact["model"]
    features = artifact["features"]

    # Step 2: Prepare input features
    input_values = {
        "active_days_last_7": data.active_days_last_7,
        "problems_last_7": data.problems_last_7,
        "days_since_last_solve": data.days_since_last_solve,
        "current_streak": data.current_streak,
        "avg_problems_per_day": data.avg_problems_per_day,
    }

    # Step 3: Validate model features
    if set(features) != set(input_values):
        raise ValueError(
            "Input features do not match trained model features."
        )

    # Step 4: Create model input in correct feature order
    input_data = pd.DataFrame(
        [[input_values[feature] for feature in features]],
        columns=features,
    )

    # Step 5: Predict streak risk
    prediction = int(model.predict(input_data)[0])

    # Step 6: Calculate risk probability
    probabilities = model.predict_proba(input_data)[0]
    classes = list(model.classes_)

    risk_index = classes.index(1)
    risk_probability = float(probabilities[risk_index])

    # Step 7: Convert prediction into readable result
    risk_level = "High" if prediction == 1 else "Low"

    return MLStreakPredictionResponse(
        prediction=prediction,
        risk_level=risk_level,
        risk_probability=round(risk_probability, 4),
        model="Random Forest Classifier",
        note=(
            "Experimental prediction based on the training dataset. "
            "This result is not a guaranteed prediction."
        ),
    )
