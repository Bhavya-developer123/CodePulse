from pydantic import BaseModel, Field
class ConsistencyRequest(BaseModel):
    daily_activity: list[int] = Field(
        min_length=1,
        max_length=30
    )
class ConsistencyResponse(BaseModel):
    total_days: int
    active_days: int
    inactive_days: int
    consistency_percentage: float
    consistency_level: str