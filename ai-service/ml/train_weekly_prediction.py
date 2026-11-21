
import pandas as pd
import joblib

from pathlib import Path
from sklearn.linear_model import LinearRegression

# 1. Define paths
BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = BASE_DIR / "datasets" / "sample_weekly_activity.csv"
MODEL_DIR = BASE_DIR / "artifacts"

MODEL_PATH = MODEL_DIR / "weekly_prediction_model.joblib"

# 2. Load dataset
df = pd.read_csv(DATASET_PATH)

print("Weekly activity dataset loaded!")
print("Total records:", len(df))

# 3. Select three API-compatible features
features = [
    "problems_this_week",
    "problems_last_week",
    "active_days"
]

target = "problems_next_week"

X = df[features]
y = df[target]

# 4. Validate dataset
if X.isnull().any().any() or y.isnull().any():
    raise ValueError("Dataset contains missing values.")

if len(df) < 3:
    raise ValueError("Not enough records to train model.")

# 5. Train model
model = LinearRegression()
model.fit(X, y)

print("\nWeekly prediction model trained!")

print("\nModel coefficients:")
for i in range(len(features)):
    print(features[i], ":", model.coef_[i])

print("\nModel intercept:", model.intercept_)

# 6. Test sample prediction
test_data = pd.DataFrame(
    [[12, 10, 5]],
    columns=features
)

prediction = model.predict(test_data)[0]

print("\nPredicted problems next week:")
print(max(0, int(round(float(prediction)))))

# 7. Save trained model
MODEL_DIR.mkdir(parents=True, exist_ok=True)

joblib.dump(
    {
        "model": model,
        "features": features
    },
    MODEL_PATH
)

print("\nModel saved successfully!")
print("Location:", MODEL_PATH)
