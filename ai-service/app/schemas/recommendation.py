from pydantic import BaseModel, Field
class RecommendationRequest(BaseModel):
    performance_score: float = Field(ge=0, le=100)
    weak_topics: list[str] = Field(default_factory=list)
    consecutive_inactive_days: int = Field(ge=0)
    total_solved: int = Field(ge=0)
class RecommendationResponse(BaseModel):
    recommendations: list[str]
    message: str