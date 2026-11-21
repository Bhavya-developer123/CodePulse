
import pandas as pd
import joblib

from pathlib import Path

from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler


# 1. Define paths
BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = BASE_DIR / "datasets" / "coding_behavior_dataset.csv"

ARTIFACT_DIR = BASE_DIR / "artifacts"

MODEL_PATH = ARTIFACT_DIR / "coding_behavior_model.joblib"


# 2. Load dataset
print("Loading coding behavior dataset...")

data = pd.read_csv(DATASET_PATH)

print("Dataset loaded successfully!")

print("Dataset shape:", data.shape)


# 3. Validate dataset
if data.empty:
    raise ValueError("Dataset is empty.")

if data.isnull().any().any():
    raise ValueError("Dataset contains missing values.")

if not data.select_dtypes(include="number").shape[1] == data.shape[1]:
    raise ValueError("All features must be numeric.")


if (data < 0).any().any():
    raise ValueError("Activity values cannot be negative.")

if (data["active_days_last_7"] > 7).any():
    raise ValueError("Active days cannot exceed 7.")

if (data["current_streak"] < 0).any():
    raise ValueError("Current streak cannot be negative.")

print("\nDataset validation successful!")


# 4. Select features
X = data[
    [
        "active_days_last_7",
        "problems_last_7",
        "current_streak",
        "avg_problems_per_day"
    ]
]


# 5. Feature scaling
print("\nScaling features...")

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)

print("Feature scaling completed!")


# 6. Create K-Means model
print("\nCreating K-Means model...")

kmeans = KMeans(
    n_clusters=3,
    random_state=42,
    n_init=10
)


# 7. Train model
print("\nTraining K-Means model...")

cluster_labels = kmeans.fit_predict(X_scaled)

print("Clustering completed successfully!")


# 8. Add cluster results
data["cluster"] = cluster_labels


# 9. Display cluster distribution
print("\nCLUSTER DISTRIBUTION")
print("-------------------------")

print(data["cluster"].value_counts().sort_index())


# 10. Display cluster centers
print("\nCLUSTER CENTERS (Original Scale)")
print("-------------------------")

centers = scaler.inverse_transform(kmeans.cluster_centers_)

centers_df = pd.DataFrame(
    centers,
    columns=X.columns
)

print(centers_df.round(2))


# 11. Calculate cluster profiles
print("\nCLUSTER PROFILES")
print("-------------------------")

profiles = data.groupby("cluster")[X.columns].mean()

for cluster_id in profiles.index:
    print(f"\nCluster {cluster_id}")

    print(profiles.loc[cluster_id].round(2))


# 12. Save model and scaler
ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)

model_data = {
    "model": kmeans,
    "scaler": scaler,
    "features": list(X.columns),
    "centers": centers_df
}

joblib.dump(model_data, MODEL_PATH)


# 13. Final result
print("\nModel saved successfully!")

print("Saved location:", MODEL_PATH)

print("\nML-6 Training Completed Successfully!")
