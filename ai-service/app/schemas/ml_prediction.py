from pydantic import BaseModel, Field

class WeeklyPredictionRequest(BaseModel):
    problems_this_week: int = Field(ge=0, le=500)
    problems_last_week: int = Field(ge=0, le=500)
    active_days: int = Field(ge=0, le=7)

class WeeklyPredictionResponse(BaseModel):
    predicted_problems_next_week: int
    model: str
    note: str
