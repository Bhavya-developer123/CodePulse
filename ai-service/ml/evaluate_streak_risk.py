
import joblib
import pandas as pd

from pathlib import Path

from sklearn.model_selection import train_test_split

from sklearn.metrics import (
    confusion_matrix,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report
)


# 1. Define paths
BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = BASE_DIR / "datasets" / "streak_risk_dataset.csv"

MODEL_PATH = BASE_DIR / "artifacts" / "streak_risk_model.joblib"


# 2. Load dataset
print("Loading dataset...")

data = pd.read_csv(DATASET_PATH)

print("Dataset loaded successfully!")


# 3. Separate features and target
X = data.drop("streak_risk", axis=1)

y = data["streak_risk"]


# 4. Recreate the same train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


# 5. Load trained model
print("\nLoading Random Forest model...")

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        "Model not found. Run train_streak_risk.py first."
    )

model_data = joblib.load(MODEL_PATH)

model = model_data["model"]

features = model_data["features"]

if list(X.columns) != features:
    raise ValueError("Dataset features do not match the saved model.")

print("Model loaded successfully!")


# 6. Make predictions
print("\nMaking predictions...")

predictions = model.predict(X_test)


# 7. Calculate confusion matrix
cm = confusion_matrix(
    y_test,
    predictions,
    labels=[0, 1]
)

tn, fp, fn, tp = cm.ravel()


# 8. Calculate classification metrics
accuracy = accuracy_score(y_test, predictions)

precision = precision_score(
    y_test,
    predictions,
    zero_division=0
)

recall = recall_score(
    y_test,
    predictions,
    zero_division=0
)

f1 = f1_score(
    y_test,
    predictions,
    zero_division=0
)


# 9. Display confusion matrix
print("\nCONFUSION MATRIX")
print("-------------------------")

print("                 Predicted")
print("              No Risk   Risk")
print(f"Actual No Risk   {tn}       {fp}")
print(f"Actual Risk     {fn}       {tp}")


# 10. Display individual values
print("\nCONFUSION MATRIX VALUES")
print("-------------------------")

print("True Negative:", tn)
print("False Positive:", fp)
print("False Negative:", fn)
print("True Positive:", tp)


# 11. Display evaluation metrics
print("\nCLASSIFICATION EVALUATION")
print("-------------------------")

print(f"Accuracy : {accuracy:.4f}")
print(f"Precision: {precision:.4f}")
print(f"Recall   : {recall:.4f}")
print(f"F1-Score : {f1:.4f}")


# 12. Detailed classification report
print("\nCLASSIFICATION REPORT")
print("-------------------------")

print(
    classification_report(
        y_test,
        predictions,
        labels=[0, 1],
        target_names=["No Risk", "Streak Risk"],
        zero_division=0
    )
)


print("\nML-5 Evaluation Completed Successfully!")
