from pydantic import BaseModel, Field, field_validator
class StreakPredictionRequest(BaseModel):
    recent_activity: list[int] = Field(
        min_length=1,
        max_length=30
    )
    @field_validator("recent_activity")
    @classmethod
    def validate_activity(cls, values):
        if any(value not in (0, 1) for value in values):
            raise ValueError(
                "Activity values must be 0 or 1."
            )
        return values
class StreakPredictionResponse(BaseModel):
    total_days: int
    active_days: int
    consecutive_inactive_days: int
    risk_level: str
    message: str