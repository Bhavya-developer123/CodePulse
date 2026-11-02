import pandas as pd
import numpy as np
import joblib

from pathlib import Path

from sklearn.linear_model import LinearRegression
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)
from sklearn.model_selection import TimeSeriesSplit


# 1. Define paths

BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = (
    BASE_DIR / "datasets" / "sample_weekly_activity.csv"
)

MODEL_DIR = BASE_DIR / "artifacts"

MODEL_PATH = MODEL_DIR / "evaluated_linear_regression.joblib"


# 2. Load dataset

df = pd.read_csv(DATASET_PATH)

print("Dataset loaded successfully!")

# 3. Select features and target

features = [
    "problems_this_week",
    "problems_last_week",
    "active_days",
    "easy_count",
    "medium_count",
    "hard_count"
]

target = "problems_next_week"

required_columns = features + [target, "week_start_date"]

if not set(required_columns).issubset(df.columns):
    raise ValueError("Dataset is missing required columns.")

df["week_start_date"] = pd.to_datetime(
    df["week_start_date"],
    errors="coerce"
)

if df[required_columns].isnull().any().any():
    raise ValueError("Dataset contains missing values.")

if not np.isfinite(
    df[features + [target]].to_numpy(dtype=float)
).all():
    raise ValueError("Dataset contains invalid numeric values.")

if (df[features + [target]] < 0).any().any():
    raise ValueError("Negative values found.")

if not df["active_days"].between(0, 7).all():
    raise ValueError("Active days must be between 0 and 7.")

if not (
    df["easy_count"]
    + df["medium_count"]
    + df["hard_count"]
    == df["problems_this_week"]
).all():
    raise ValueError("Difficulty counts do not match weekly totals.")


# 4. Sort data chronologically

df = df.sort_values(
    by=["week_start_date", "user_id"]
).reset_index(drop=True)

X = df[features]
y = df[target]

unique_dates = sorted(df["week_start_date"].unique())

if len(unique_dates) < 3:
    raise ValueError(
        "At least 3 distinct weeks are required for this exercise."
    )


# 5. Chronological train-test split

split_index = int(len(unique_dates) * 0.8)

split_index = max(
    1,
    min(split_index, len(unique_dates) - 1)
)

split_date = unique_dates[split_index]

train_mask = df["week_start_date"] < split_date

test_mask = df["week_start_date"] >= split_date

X_train = X.loc[train_mask]
X_test = X.loc[test_mask]

y_train = y.loc[train_mask]
y_test = y.loc[test_mask]

print("\nTraining records:", len(X_train))
print("Testing records:", len(X_test))

print("Last training week:", df.loc[train_mask, "week_start_date"].max())
print("First testing week:", df.loc[test_mask, "week_start_date"].min())


# 6. Train the model

model = LinearRegression()

model.fit(X_train, y_train)

print("\nModel training completed!")


# 7. Make predictions

y_pred = model.predict(X_test)


# 8. Calculate evaluation metrics

mae = mean_absolute_error(y_test, y_pred)

mse = mean_squared_error(y_test, y_pred)

rmse = np.sqrt(mse)

r2 = r2_score(y_test, y_pred)

print("\n========== TEST METRICS ==========")

print("MAE:", round(mae, 3))
print("MSE:", round(mse, 3))
print("RMSE:", round(rmse, 3))
print("R2 Score:", round(r2, 3))


# 9. Compare with a simple baseline

baseline_prediction = np.full(
    len(y_test),
    y_train.mean()
)

baseline_mae = mean_absolute_error(
    y_test,
    baseline_prediction
)

print("\n========== BASELINE COMPARISON ==========")

print("Baseline MAE:", round(baseline_mae, 3))
print("Model MAE:", round(mae, 3))


# 10. Display actual vs predicted values

results = pd.DataFrame({
    "Actual": y_test.to_numpy(),
    "Predicted": y_pred,
    "Absolute_Error": np.abs(y_test.to_numpy() - y_pred)
})

print("\n========== PREDICTION RESULTS ==========")

print(results.round(2))


# 11. Time-series cross-validation

print("\n========== TIME SERIES CROSS VALIDATION ==========")

tscv = TimeSeriesSplit(n_splits=2)

cv_mae_scores = []
cv_rmse_scores = []

for fold, (train_indices, test_indices) in enumerate(
    tscv.split(unique_dates),
    start=1
):

    train_dates = set(unique_dates[i] for i in train_indices)

    test_dates = set(unique_dates[i] for i in test_indices)

    fold_train_mask = df["week_start_date"].isin(train_dates)

    fold_test_mask = df["week_start_date"].isin(test_dates)

    X_fold_train = X.loc[fold_train_mask]
    X_fold_test = X.loc[fold_test_mask]

    y_fold_train = y.loc[fold_train_mask]
    y_fold_test = y.loc[fold_test_mask]

    fold_model = LinearRegression()

    fold_model.fit(X_fold_train, y_fold_train)

    fold_predictions = fold_model.predict(X_fold_test)

    fold_mae = mean_absolute_error(
        y_fold_test,
        fold_predictions
    )

    fold_rmse = np.sqrt(
        mean_squared_error(
            y_fold_test,
            fold_predictions
        )
    )

    cv_mae_scores.append(fold_mae)
    cv_rmse_scores.append(fold_rmse)

    print(f"\nFold {fold}")
    print("MAE:", round(fold_mae, 3))
    print("RMSE:", round(fold_rmse, 3))


print("\nAverage CV MAE:", round(np.mean(cv_mae_scores), 3))

print("Average CV RMSE:", round(np.mean(cv_rmse_scores), 3))


# 12. Save the final model

MODEL_DIR.mkdir(parents=True, exist_ok=True)

joblib.dump(
    {
        "model": model,
        "features": features,
        "training_cutoff": str(split_date)
    },
    MODEL_PATH
)

print("\nEvaluated model saved successfully!")

print("Model location:", MODEL_PATH)