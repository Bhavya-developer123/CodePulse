from app.schemas.streak_prediction import (
    StreakPredictionRequest,
    StreakPredictionResponse,
)
def predict_streak_risk(
    data: StreakPredictionRequest,
) -> StreakPredictionResponse:
    activity = data.recent_activity
    total_days = len(activity)
    active_days = sum(activity)
    consecutive_inactive_days = 0
    for index in range(total_days - 1, -1, -1):
        if activity[index] == 0:
            consecutive_inactive_days += 1
        else:
            break
    if consecutive_inactive_days == 0:
        risk_level = "Low"
        message = "Recent activity is positive. Keep practicing."
    elif consecutive_inactive_days == 1:
        risk_level = "Medium"
        message = "You missed the latest day. Resume coding soon."
    else:
        risk_level = "High"
        message = (
            "Several consecutive inactive days detected. "
            "Resume coding to rebuild your routine."
        )
    return StreakPredictionResponse(
        total_days=total_days,
        active_days=active_days,
        consecutive_inactive_days=consecutive_inactive_days,
        risk_level=risk_level,
        message=message,
    )