
from pathlib import Path
import joblib
import numpy as np
from app.schemas.ml_prediction import (
    WeeklyPredictionRequest,
    WeeklyPredictionResponse,
)
BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_PATH = BASE_DIR / "ml" / "artifacts" / "linear_regression.joblib"
_model_artifact = None
def get_model_artifact():
    global _model_artifact
    if _model_artifact is None:
        if not MODEL_PATH.exists():
            raise RuntimeError(
                "Trained model not found. Run python ml/train_model.py first."
            )

        _model_artifact = joblib.load(MODEL_PATH)
    return _model_artifact

def predict_next_week(
    data: WeeklyPredictionRequest,
) -> WeeklyPredictionResponse:
    artifact = get_model_artifact()
    model = artifact["model"]
    features = np.array(
        [[
            data.problems_this_week,
            data.problems_last_week,
            data.active_days,
        ]],
        dtype=float,
    )
    prediction = float(model.predict(features)[0])
    predicted_count = max(0, int(round(prediction)))
    return WeeklyPredictionResponse(
        predicted_problems_next_week=predicted_count,
        model="Linear Regression",
        note=(
            "Experimental estimate from synthetic training data; "
            "not yet validated for real user predictions."
        ),
    )
