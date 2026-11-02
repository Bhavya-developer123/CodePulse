import pandas as pd
import numpy as np
import joblib

from pathlib import Path
from sklearn.linear_model import LinearRegression

# 1. File paths
BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = BASE_DIR / "datasets" / "sample_weekly_activity.csv"

MODEL_DIR = BASE_DIR / "artifacts"

MODEL_PATH = MODEL_DIR / "linear_regression.joblib"

# 2. Load dataset
df = pd.read_csv(DATASET_PATH)

print("Dataset loaded successfully!")
print(df.head())

# 3. Select input features
features = [
    "problems_this_week",
    "problems_last_week",
    "active_days",
    "easy_count",
    "medium_count",
    "hard_count"
]
target = "problems_next_week"

X = df[features]
y = df[target]

# 5. Validate dataset
if X.isnull().any().any() or y.isnull().any():
    raise ValueError("Dataset contains missing values.")

if len(df) < 3:
    raise ValueError("Not enough records to train the model.")

# 6. Create Linear Regression model
model = LinearRegression()

# 7. Train the model
model.fit(X, y)

print("\nModel training completed!")

# 8. Display learned coefficients
print("\nIntercept:")
print(model.intercept_)

print("\nFeature coefficients:")

for i in range(len(features)):
    print(features[i], ":", model.coef_[i])
# 9. Predict using an example
new_user = pd.DataFrame(
    [[12, 10, 5, 5, 5, 2]],
    columns=features
)

prediction = model.predict(new_user)

predicted_problems = max(0, int(round(prediction[0])))

print("\nPredicted problems next week:")
print(predicted_problems)

# 10. Save model
MODEL_DIR.mkdir(parents=True, exist_ok=True)

joblib.dump(
    {
        "model": model,
        "features": features
    },
    MODEL_PATH
)

print("\nModel saved successfully!")
print(MODEL_PATH)