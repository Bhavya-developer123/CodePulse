import pandas as pd
import joblib
from pathlib import Path
from feature_engineering_utils import create_features
from sklearn.model_selection import (
    train_test_split,
    StratifiedKFold,
    cross_validate
)

from sklearn.pipeline import Pipeline

from sklearn.preprocessing import StandardScaler

from sklearn.linear_model import LogisticRegression

from sklearn.tree import DecisionTreeClassifier

from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report
)


# 1. Define paths
BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = BASE_DIR / "datasets" / "streak_risk_dataset.csv"

ARTIFACT_DIR = BASE_DIR / "artifacts"

MODEL_PATH = ARTIFACT_DIR / "feature_engineered_model.joblib"

RESULT_PATH = ARTIFACT_DIR / "model_comparison.csv"


# 2. Load dataset
print("Loading coding activity dataset...")

data = pd.read_csv(DATASET_PATH)

print("Dataset loaded:", data.shape)


# 3. Validate dataset
required_columns = [
    "active_days_last_7",
    "problems_last_7",
    "days_since_last_solve",
    "current_streak",
    "avg_problems_per_day",
    "streak_risk"
]

if not all(column in data.columns for column in required_columns):
    raise ValueError("Required columns are missing.")

if data[required_columns].isnull().any().any():
    raise ValueError("Dataset contains missing values.")

if data["streak_risk"].nunique() != 2:
    raise ValueError("Both target classes are required.")

if not set(data["streak_risk"].unique()).issubset({0, 1}):
    raise ValueError("Target must contain only 0 and 1.")

if (data[required_columns].drop(columns="streak_risk") < 0).any().any():
    raise ValueError("Feature values cannot be negative.")

if (data["active_days_last_7"] > 7).any():
    raise ValueError("Active days cannot exceed 7.")

print("Dataset validation successful!")


# 4. Feature engineering
print("\nCreating new features...")

engineered_data = create_features(data)

print("Feature engineering completed!")

print("\nNew engineered features:")

print(
    engineered_data[
        [
            "activity_consistency",
            "problems_per_active_day",
            "inactivity_ratio"
        ]
    ].head()
)


# 5. Separate features and target
X = engineered_data.drop("streak_risk", axis=1)

y = engineered_data["streak_risk"]

print("\nTotal features:", X.shape[1])


# 6. Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining records:", len(X_train))

print("Testing records:", len(X_test))


# 7. Define algorithms
models = {

    "Logistic Regression": Pipeline([
        ("scaler", StandardScaler()),
        ("classifier", LogisticRegression(
            max_iter=1000,
            random_state=42
        ))
    ]),

    "Decision Tree": DecisionTreeClassifier(
        max_depth=5,
        random_state=42,
        class_weight="balanced"
    ),

    "Random Forest": RandomForestClassifier(
        n_estimators=200,
        max_depth=5,
        random_state=42,
        class_weight="balanced"
    )
}


# 8. Cross-validation setup
cv = StratifiedKFold(
    n_splits=3,
    shuffle=True,
    random_state=42
)


# 9. Compare algorithms
print("\nMODEL COMPARISON")
print("-------------------------")

results = []

for model_name, model in models.items():

    scores = cross_validate(
        model,
        X_train,
        y_train,
        cv=cv,
        scoring={
            "accuracy": "accuracy",
            "f1": "f1"
        },
        return_train_score=False
    )

    mean_accuracy = scores["test_accuracy"].mean()

    mean_f1 = scores["test_f1"].mean()

    results.append({
        "model": model_name,
        "cv_accuracy": mean_accuracy,
        "cv_f1": mean_f1
    })

    print("\nModel:", model_name)

    print(f"CV Accuracy: {mean_accuracy:.4f}")

    print(f"CV F1-Score: {mean_f1:.4f}")


# 10. Select best model using CV F1
results_df = pd.DataFrame(results)

best_model_name = results_df.loc[
    results_df["cv_f1"].idxmax(),
    "model"
]

print("\nBEST MODEL")
print("-------------------------")

print("Selected model:", best_model_name)


# 11. Train selected model on training data
best_model = models[best_model_name]

best_model.fit(X_train, y_train)

print("\nBest model trained successfully!")


# 12. Test on unseen test data
predictions = best_model.predict(X_test)

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


print("\nFINAL TEST RESULTS")
print("-------------------------")

print(f"Accuracy : {accuracy:.4f}")

print(f"Precision: {precision:.4f}")

print(f"Recall   : {recall:.4f}")

print(f"F1-Score : {f1:.4f}")


# 13. Detailed classification report
print("\nCLASSIFICATION REPORT")

print(
    classification_report(
        y_test,
        predictions,
        labels=[0, 1],
        target_names=["No Risk", "Streak Risk"],
        zero_division=0
    )
)


# 14. Save comparison results
results_df["test_accuracy"] = None

results_df["test_precision"] = None

results_df["test_recall"] = None

results_df["test_f1"] = None

selected_index = results_df.index[
    results_df["model"] == best_model_name
][0]

results_df.loc[selected_index, "test_accuracy"] = accuracy

results_df.loc[selected_index, "test_precision"] = precision

results_df.loc[selected_index, "test_recall"] = recall

results_df.loc[selected_index, "test_f1"] = f1


ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

results_df.to_csv(RESULT_PATH, index=False)


# 15. Save selected model
model_data = {
    "model": best_model,
    "model_name": best_model_name,
    "features": list(X.columns)
}

joblib.dump(model_data, MODEL_PATH)


# 16. Final output
print("\nMODEL COMPARISON RESULTS")

print(results_df.to_string(index=False))

print("\nSaved model:", MODEL_PATH)

print("Saved comparison:", RESULT_PATH)

print("\nML-8 Feature Engineering Completed Successfully!")
