import pandas as pd
import joblib
import matplotlib.pyplot as plt
from pathlib import Path
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score


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

if not all(data.dtypes.apply(lambda dtype: pd.api.types.is_numeric_dtype(dtype))):
    raise ValueError("All features must be numeric.")

if data.duplicated().any():
    print("Warning: Dataset contains repeated activity patterns.")

if len(data) < 3:
    raise ValueError("At least 3 records are required.")


# 4. Select features
features = [
    "active_days_last_7",
    "problems_last_7",
    "current_streak",
    "avg_problems_per_day"
]

if not all(feature in data.columns for feature in features):
    raise ValueError("Required features are missing.")

X = data[features]


# 5. Scale features
print("\nScaling features...")

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)

print("Feature scaling completed!")


# 6. Calculate inertia and silhouette scores
inertia_values = []

silhouette_values = []

k_values = range(2, 9)

print("\nEvaluating different K values...")

# Calculate inertia for K = 1 to 8
for k in range(1, 9):

    model = KMeans(
        n_clusters=k,
        random_state=42,
        n_init=10
    )

    model.fit(X_scaled)

    inertia_values.append(model.inertia_)

    print(f"K = {k}, Inertia = {model.inertia_:.4f}")


# Calculate silhouette for K = 2 to 8
print("\nSILHOUETTE SCORES")
print("-------------------------")

for k in k_values:

    model = KMeans(
        n_clusters=k,
        random_state=42,
        n_init=10
    )

    labels = model.fit_predict(X_scaled)

    score = silhouette_score(
        X_scaled,
        labels
    )

    silhouette_values.append(score)

    print(f"K = {k}, Silhouette Score = {score:.4f}")


# 7. Find the highest silhouette score
best_index = silhouette_values.index(max(silhouette_values))

best_k = list(k_values)[best_index]

print("\nBEST SILHOUETTE SCORE")
print("-------------------------")

print("Best K:", best_k)

print("Best Silhouette Score:", round(max(silhouette_values), 4))


# 8. Plot Elbow Method
plt.figure(figsize=(8, 5))

plt.plot(
    range(1, 9),
    inertia_values,
    marker="o"
)

plt.title("Elbow Method - K-Means Clustering")

plt.xlabel("Number of Clusters (K)")

plt.ylabel("Inertia")

plt.xticks(range(1, 9))

plt.grid(True)

plt.savefig(
    ARTIFACT_DIR / "elbow_method.png",
    dpi=150,
    bbox_inches="tight"
)

plt.close()


# 9. Plot Silhouette Scores
plt.figure(figsize=(8, 5))

plt.plot(
    list(k_values),
    silhouette_values,
    marker="o"
)

plt.title("Silhouette Score - K-Means Clustering")

plt.xlabel("Number of Clusters (K)")

plt.ylabel("Silhouette Score")

plt.xticks(list(k_values))

plt.grid(True)

plt.savefig(
    ARTIFACT_DIR / "silhouette_scores.png",
    dpi=150,
    bbox_inches="tight"
)

plt.close()


# 10. Load previously saved ML-6 model
if not MODEL_PATH.exists():
    raise FileNotFoundError(
        "ML-6 model not found. Run train_clustering.py first."
    )

model_data = joblib.load(MODEL_PATH)

previous_model = model_data["model"]

previous_k = previous_model.n_clusters


# 11. Compare previous K with evaluation
previous_index = list(k_values).index(previous_k) if previous_k in k_values else None

print("\nML-6 MODEL COMPARISON")
print("-------------------------")

print("Previous K:", previous_k)

if previous_index is not None:

    print(
        "Previous K Silhouette Score:",
        round(silhouette_values[previous_index], 4)
    )

else:

    print("Previous K is outside the evaluation range.")


# 12. Final results
print("\nGRAPH FILES SAVED")
print("-------------------------")

print(ARTIFACT_DIR / "elbow_method.png")

print(ARTIFACT_DIR / "silhouette_scores.png")

print("\nML-7 Clustering Evaluation Completed Successfully!")
