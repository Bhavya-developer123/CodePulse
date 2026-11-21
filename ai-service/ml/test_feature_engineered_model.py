
from recommendation_engine import (
    load_topic_data,
    analyse_topic,
    generate_recommendations
)


# 1. Test dataset loading
print("Testing dataset loading...")

data = load_topic_data()

assert not data.empty

print("Dataset loading test passed!")


# 2. Test weak topic detection
print("\nTesting weak topic detection...")

dynamic_programming = data[
    data["topic"] == "Dynamic Programming"
].iloc[0]

result = analyse_topic(dynamic_programming)

assert result["status"] == "Needs Improvement"

print("Weak topic detection test passed!")


# 3. Test insufficient data detection
print("\nTesting insufficient data detection...")

strings = data[
    data["topic"] == "Strings"
].iloc[0]

result = analyse_topic(strings)

assert result["status"] == "Need More Practice Data"

print("Insufficient data test passed!")


# 4. Test strong topic detection
print("\nTesting strong topic detection...")

arrays = data[
    data["topic"] == "Arrays"
].iloc[0]

result = analyse_topic(arrays)

assert result["status"] == "Strong Topic"

print("Strong topic detection test passed!")


# 5. Test user recommendations
print("\nTesting personalised recommendations...")

recommendations = generate_recommendations(
    data,
    101
)

assert len(recommendations) == 6

assert recommendations[0]["status"] == "Needs Improvement"

print("Personalised recommendation test passed!")


# 6. Display final test result
print("\nALL ML-9 TESTS PASSED!")
