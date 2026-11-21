
import pandas as pd
from pathlib import Path


# 1. Define dataset path
BASE_DIR = Path(__file__).resolve().parent

DATASET_PATH = BASE_DIR / "datasets" / "topic_performance.csv"


# 2. Load and validate dataset
def load_topic_data():

    if not DATASET_PATH.exists():
        raise FileNotFoundError(
            f"Dataset not found: {DATASET_PATH}"
        )

    data = pd.read_csv(DATASET_PATH)

    required_columns = [
        "user_id",
        "topic",
        "attempted",
        "solved",
        "easy_attempted",
        "easy_solved",
        "medium_attempted",
        "medium_solved",
        "hard_attempted",
        "hard_solved"
    ]

    missing_columns = [
        column for column in required_columns
        if column not in data.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Missing columns: {missing_columns}"
        )

    numeric_columns = required_columns.copy()
    numeric_columns.remove("topic")

    if data[numeric_columns].isnull().any().any():
        raise ValueError("Dataset contains missing values.")

    if (data[numeric_columns] < 0).any().any():
        raise ValueError("Negative values are not allowed.")

    # Validate solved counts
    if (data["solved"] > data["attempted"]).any():
        raise ValueError("Solved cannot exceed attempted.")

    for difficulty in ["easy", "medium", "hard"]:

        attempted_column = f"{difficulty}_attempted"
        solved_column = f"{difficulty}_solved"

        if (
            data[solved_column] > data[attempted_column]
        ).any():
            raise ValueError(
                f"{difficulty} solved cannot exceed attempts."
            )

    # Validate difficulty totals
    difficulty_attempts = (
        data["easy_attempted"]
        + data["medium_attempted"]
        + data["hard_attempted"]
    )

    difficulty_solved = (
        data["easy_solved"]
        + data["medium_solved"]
        + data["hard_solved"]
    )

    if not (difficulty_attempts == data["attempted"]).all():
        raise ValueError(
            "Difficulty attempts must equal total attempts."
        )

    if not (difficulty_solved == data["solved"]).all():
        raise ValueError(
            "Difficulty solved counts must equal total solved."
        )

    return data


# 3. Calculate success rate safely
def calculate_success_rate(solved, attempted):

    if attempted == 0:
        return 0.0

    return (solved / attempted) * 100


# 4. Analyse one topic
def analyse_topic(row):

    attempted = int(row["attempted"])
    solved = int(row["solved"])

    success_rate = calculate_success_rate(
        solved,
        attempted
    )

    # Avoid judging topics with insufficient data
    if attempted < 5:

        status = "Need More Practice Data"

        difficulty = "Easy"

        weekly_problems = 3

        reason = (
            "Too few attempts to evaluate performance reliably."
        )

    elif success_rate < 50:

        status = "Needs Improvement"

        easy_rate = calculate_success_rate(
            int(row["easy_solved"]),
            int(row["easy_attempted"])
        )

        if easy_rate < 60:
            difficulty = "Easy"
        else:
            difficulty = "Medium"

        weekly_problems = 3

        reason = (
            "Success rate is below 50%. "
            "Focus on strengthening fundamentals."
        )

    elif success_rate < 80:

        status = "Keep Practising"

        difficulty = "Medium"

        weekly_problems = 2

        reason = (
            "Performance is developing. "
            "Practise more problems to improve consistency."
        )

    else:

        status = "Strong Topic"

        difficulty = "Hard"

        weekly_problems = 2

        reason = (
            "Good solving performance. "
            "Try more challenging problems."
        )

    return {
        "topic": row["topic"],
        "attempted": attempted,
        "solved": solved,
        "success_rate": round(success_rate, 2),
        "status": status,
        "recommended_difficulty": difficulty,
        "weekly_problems": weekly_problems,
        "reason": reason
    }


# 5. Generate recommendations for one user
def generate_recommendations(data, user_id):

    user_data = data[
        data["user_id"] == user_id
    ]

    if user_data.empty:
        raise ValueError(
            f"No topic data found for user {user_id}."
        )

    recommendations = []

    for _, row in user_data.iterrows():

        result = analyse_topic(row)

        recommendations.append(result)

    # Prioritise topics needing improvement,
    # followed by topics with insufficient data.
    priority = {
        "Needs Improvement": 0,
        "Need More Practice Data": 1,
        "Keep Practising": 2,
        "Strong Topic": 3
    }

    recommendations.sort(
        key=lambda item: (
            priority[item["status"]],
            item["success_rate"]
        )
    )

    return recommendations


# 6. Display recommendations
def display_recommendations(recommendations, user_id):

    print("\nCODEPULSE PERSONALIZED RECOMMENDATIONS")
    print("========================================")

    print("User ID:", user_id)

    for item in recommendations:

        print("\nTopic:", item["topic"])

        print("Attempts:", item["attempted"])

        print("Solved:", item["solved"])

        print(
            "Success Rate:",
            f'{item["success_rate"]:.2f}%'
        )

        print("Status:", item["status"])

        print(
            "Recommended Difficulty:",
            item["recommended_difficulty"]
        )

        print(
            "Weekly Practice:",
            item["weekly_problems"],
            "problems"
        )

        print("Reason:", item["reason"])

    print("\nWEEKLY PRACTICE PLAN")
    print("-------------------------")

    for item in recommendations:

        if item["status"] != "Strong Topic":

            print(
                f'{item["weekly_problems"]} '
                f'{item["recommended_difficulty"]} '
                f'{item["topic"]} problems'
            )

    print("\nRecommendation generation completed!")


# 7. Main execution
if __name__ == "__main__":

    print("Loading topic performance dataset...")

    data = load_topic_data()

    print("Dataset loaded:", data.shape)

    USER_ID = 101

    recommendations = generate_recommendations(
        data,
        USER_ID
    )

    display_recommendations(
        recommendations,
        USER_ID
    )
