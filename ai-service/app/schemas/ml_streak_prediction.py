
from pydantic import BaseModel, Field


class MLStreakPredictionRequest(BaseModel):

    active_days_last_7: int = Field(ge=0, le=7)

    problems_last_7: int = Field(ge=0, le=500)

    days_since_last_solve: int = Field(ge=0, le=365)

    current_streak: int = Field(ge=0, le=365)

    avg_problems_per_day: float = Field(ge=0, le=100)


class MLStreakPredictionResponse(BaseModel):

    prediction: int

    risk_level: str

    risk_probability: float

    model: str

    note: str
