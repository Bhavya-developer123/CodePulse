from app.schemas.topic import (
    WeakTopicRequest,
    WeakTopicResponse,
    WeakTopicResult,
)
def detect_weak_topics(
    data: WeakTopicRequest,
) -> WeakTopicResponse:
    if not data.topics:
        return WeakTopicResponse(
            weak_topics=[],
            message="No topic statistics available.",
        )
    weak_topics = []
    for item in data.topics:
        if item.solved < 5:
            weak_topics.append(
                WeakTopicResult(
                    topic=item.topic,
                    solved=item.solved,
                    status="Needs Practice",
                )
            )
    return WeakTopicResponse(
        weak_topics=weak_topics,
        message=(
            "Topics needing more practice detected."
            if weak_topics
            else "No topics flagged for low practice volume."
        ),
    )