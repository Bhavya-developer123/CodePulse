from app.schemas.consistency import (
    ConsistencyRequest,
    ConsistencyResponse,
)
def analyze_consistency(
    data: ConsistencyRequest,
) -> ConsistencyResponse:
    activity = data.daily_activity
    if any(day not in (0, 1) for day in activity):
        raise ValueError(
            "Each daily activity value must be 0 or 1."
        )
    total_days = len(activity)
    active_days = sum(activity)
    inactive_days = total_days - active_days
    percentage = round(
        (active_days / total_days) * 100,
        2,
    )
    if percentage >= 80:
        level = "Highly Consistent"
    elif percentage >= 50:
        level = "Moderately Consistent"
    else:
        level = "Needs Improvement"
    return ConsistencyResponse(
        total_days=total_days,
        active_days=active_days,
        inactive_days=inactive_days,
        consistency_percentage=percentage,
        consistency_level=level,
    )