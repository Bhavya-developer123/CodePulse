from app.schemas.recommendation import (
    RecommendationRequest,
    RecommendationResponse,
)
from ml.recommendation_engine import (
    load_topic_data,
    generate_recommendations as generate_topic_recommendations
)
def get_topic_recommendations(user_id: int):

    # Load ML-9 topic performance dataset
    data = load_topic_data()

    # Generate personalised topic recommendations
    recommendations = generate_topic_recommendations(
        data,
        user_id
    )

    return {
        "user_id": user_id,
        "total_topics": len(recommendations),
        "recommendations": recommendations
    }
def generate_recommendations(
    data: RecommendationRequest,
) -> RecommendationResponse:
    recommendations = []
    if data.weak_topics:
        topic = data.weak_topics[0].strip()
        if topic:
            recommendations.append(
                f"Practice {topic}: solve two problems "
                "to strengthen your familiarity with this topic."
            )
    if data.consecutive_inactive_days >= 3:
        recommendations.append(
            "Restart your routine: solve one manageable "
            "problem today."
        )
    elif data.consecutive_inactive_days == 1:
        recommendations.append(
            "Resume your coding practice today to maintain "
            "your routine."
        )
    if data.performance_score < 40:
        recommendations.append(
            "Build your foundation: set a small daily goal "
            "and focus on solving problems consistently."
        )
    elif data.performance_score < 70:
        recommendations.append(
            "Keep progressing: practice medium-level "
            "problems after reviewing your fundamentals."
        )
    else:
        recommendations.append(
            "Challenge yourself: attempt harder problems "
            "and review your solutions for efficiency."
        )
    if data.total_solved < 10:
        recommendations.append(
            "Build momentum: aim to solve your next "
            "five problems at a comfortable difficulty."
        )
    return RecommendationResponse(
        recommendations=recommendations,
        message=(
            "Personalized recommendations generated successfully."
        ),
    )