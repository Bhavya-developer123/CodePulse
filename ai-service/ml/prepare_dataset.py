import pandas as pd
from pathlib import Path

# Dataset path
DATASET_PATH = Path("ml/datasets/sample_weekly_activity.csv")

# Load dataset
df = pd.read_csv(DATASET_PATH)

print("\n========== DATASET OVERVIEW ==========")

# Display first five rows
print("\nFirst five records:")
print(df.head())

# Dataset dimensions
print("\nDataset shape:")
print(df.shape)

# Column information
print("\nDataset information:")
df.info()

# Check missing values
print("\nMissing values:")
print(df.isnull().sum())

# Check duplicate records
print("\nDuplicate records:")
print(df.duplicated().sum())

# Convert date column
df["week_start_date"] = pd.to_datetime(
    df["week_start_date"],
    errors="coerce"
)

# Required columns
required_columns = [
    "user_id",
    "week_start_date",
    "problems_this_week",
    "problems_last_week",
    "active_days",
    "easy_count",
    "medium_count",
    "hard_count",
    "problems_next_week"
]

# Check required columns
missing_columns = [
    column for column in required_columns
    if column not in df.columns
]

if missing_columns:
    raise ValueError(f"Missing columns: {missing_columns}")

# Check missing values
if df[required_columns].isnull().any().any():
    raise ValueError("Dataset contains missing values.")

# Check duplicate user-week combinations
if df.duplicated(
    subset=["user_id", "week_start_date"]
).any():
    raise ValueError("Duplicate user-week records found.")

# Check non-negative activity counts
count_columns = [
    "problems_this_week",
    "problems_last_week",
    "active_days",
    "easy_count",
    "medium_count",
    "hard_count",
    "problems_next_week"
]

if (df[count_columns] < 0).any().any():
    raise ValueError("Negative activity values found.")

# Active days must be between 0 and 7
if not df["active_days"].between(0, 7).all():
    raise ValueError("Active days must be between 0 and 7.")

# Difficulty counts should equal weekly total
difficulty_total = (
    df["easy_count"]
    + df["medium_count"]
    + df["hard_count"]
)

if not (difficulty_total == df["problems_this_week"]).all():
    raise ValueError("Difficulty counts do not match weekly total.")

# Sort records chronologically
df = df.sort_values(
    by=["user_id", "week_start_date"]
)

print("\n========== VALIDATION RESULT ==========")
print("Dataset validation successful!")

print("\nFinal dataset:")
print(df)

print("\nTotal records:", len(df))
print("Unique users:", df["user_id"].nunique())