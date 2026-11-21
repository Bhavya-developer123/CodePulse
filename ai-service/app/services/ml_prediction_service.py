
import pandas as pd

from app.schemas.ml_prediction import (
    WeeklyPredictionRequest,
    WeeklyPredictionResponse,
)
from app.services.ml_model_service import load_model_artifact


def predict_next_week(
    data: WeeklyPredictionRequest,
) -> WeeklyPredictionResponse:

    artifact = load_model_artifact("weekly_prediction_model.joblib")

    model = artifact["model"]
    features = artifact["features"]

    input_values = data.model_dump()

    if set(features) != set(input_values):
        raise ValueError(
            "Input features do not match trained model features."
        )

    input_data = pd.DataFrame(
        [[input_values[feature] for feature in features]],
        columns=features,
    )

    predicted_value = model.predict(input_data)[0]

    predicted_problems = max(
        0,
        int(round(float(predicted_value)))
    )

    return WeeklyPredictionResponse(
        predicted_problems_next_week=predicted_problems,
        model=type(model).__name__,
        note="Prediction generated using the trained weekly activity model."
    )
