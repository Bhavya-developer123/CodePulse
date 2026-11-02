import joblib
import pandas as pd

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "artifacts" / "linear_regression.joblib"

saved_data = joblib.load(MODEL_PATH)

model = saved_data["model"]
features = saved_data["features"]

new_data = pd.DataFrame(
    [[15, 12, 6, 6, 7, 2]],
    columns=features
)

prediction = model.predict(new_data)

print("Prediction:", max(0, round(prediction[0])))