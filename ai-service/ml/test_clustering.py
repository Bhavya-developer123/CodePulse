
import joblib
import pandas as pd

from pathlib import Path


# 1. Define model path
BASE_DIR = Path(__file__).resolve().parent

MODEL_PATH = BASE_DIR / "artifacts" / "coding_behavior_model.joblib"


# 2. Load saved model
print("Loading K-Means model...")

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        "Model not found. Run train_clustering.py first."
    )

model_data = joblib.load(MODEL_PATH)

kmeans = model_data["model"]

scaler = model_data["scaler"]

features = model_data["features"]

centers = model_data["centers"]

print("Model loaded successfully!")


# 3. Create new user activity
user_activity = {
    "active_days_last_7": 2,
    "problems_last_7": 3,
    "current_streak": 1,
    "avg_problems_per_day": 0.4
}


# 4. Convert input into DataFrame
input_data = pd.DataFrame(
    [user_activity],
    columns=features
)


# 5. Validate input
if input_data.isnull().any().any():
    raise ValueError("User activity contains missing values.")

if (input_data < 0).any().any():
    raise ValueError("Activity values cannot be negative.")

if input_data["active_days_last_7"].iloc[0] > 7:
    raise ValueError("Active days cannot exceed 7.")


# 6. Scale new user data
scaled_input = scaler.transform(input_data)


# 7. Predict cluster
cluster = int(kmeans.predict(scaled_input)[0])


# 8. Determine cluster activity profiles
scaled_centers = scaler.transform(centers[features])

activity_scores = scaled_centers.mean(axis=1)

sorted_clusters = activity_scores.argsort()

profile_names = {
    int(sorted_clusters[0]): "Low Activity Coder",
    int(sorted_clusters[1]): "Moderate Activity Coder",
    int(sorted_clusters[2]): "High Activity Coder"
}


# 9. Display prediction
print("\nCODEPULSE CODING BEHAVIOR ANALYSIS")
print("----------------------------------")

print("\nUser Activity:")

print(input_data.to_string(index=False))

print("\nPredicted Cluster:", cluster)

print("Coding Behavior:", profile_names[cluster])

print("\nCluster Center:")

print(centers.iloc[cluster].round(2).to_dict())


print("\nClustering prediction completed successfully!")
