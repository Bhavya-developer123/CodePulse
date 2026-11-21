import pandas as pd
import joblib
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
BASE_DIR = Path(__file__).resolve().parent
DATASET_PATH = BASE_DIR / "datasets" / "streak_risk_dataset.csv"
ARTIFACT_DIR = BASE_DIR / "artifacts"
MODEL_PATH = ARTIFACT_DIR / "streak_risk_model.joblib"
print("Loading streak risk dataset...")
data = pd.read_csv(DATASET_PATH)
print("\nDataset loaded successfully!")
print("Dataset shape:", data.shape)
required_columns = [
    "active_days_last_7",
    "problems_last_7",
    "days_since_last_solve",
    "current_streak",
    "avg_problems_per_day",
    "streak_risk"
]

if not all(column in data.columns for column in required_columns):
    raise ValueError("Dataset is missing required columns.")

if data[required_columns].isnull().any().any():
    raise ValueError("Dataset contains missing values.")

if not set(data["streak_risk"].unique()).issubset({0, 1}):
    raise ValueError("Target must contain only 0 and 1.")

if data["streak_risk"].nunique() != 2:
    raise ValueError("Dataset must contain both target classes.")

print("\nDataset validation successful!")

X = data.drop("streak_risk", axis=1)

y = data["streak_risk"]


print("\nFeatures:")
print(X.head())

print("\nTarget:")
print(y.head())



X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining records:", len(X_train))
print("Testing records:", len(X_test))

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=5,
    random_state=42,
    class_weight="balanced"
)


print("\nTraining Random Forest model...")

model.fit(X_train, y_train)

print("Model training completed!")



predictions = model.predict(X_test)


accuracy = accuracy_score(y_test, predictions)

print("\nModel Evaluation")
print("-------------------------")
print(f"Accuracy: {accuracy * 100:.2f}%")



ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

model_data = {
    "model": model,
    "features": list(X.columns),
    "classes": {
        0: "No Risk",
        1: "Streak Break Risk"
    }
}

joblib.dump(model_data, MODEL_PATH)

print("\nModel saved successfully!")
print("Saved location:", MODEL_PATH)
