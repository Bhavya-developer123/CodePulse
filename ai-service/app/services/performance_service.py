from app.schemas.performance import (
    PerformanceRequest,
    PerformanceResponse,
)
def calculate_performance(
    data: PerformanceRequest,
) -> PerformanceResponse:
    total = data.total_solved
    progress_score = min(total / 100, 1.0) * 60
    if total == 0:
        difficulty_score = 0.0
    else:
        weighted_score = (
            data.easy_count
            + (data.medium_count * 2)
            + (data.hard_count * 3)
        )
        difficulty_score = (
            weighted_score / (total * 3)
        ) * 40
    score = round(progress_score + difficulty_score, 2)
    if score >= 80:
        level = "Excellent"
    elif score >= 60:
        level = "Good"
    elif score >= 40:
        level = "Developing"
    else:
        level = "Beginner"
    return PerformanceResponse(
        score=score,
        level=level,
        total_solved=total,
        progress_score=round(progress_score, 2),
        difficulty_score=round(difficulty_score, 2),
    )