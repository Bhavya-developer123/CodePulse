from pydantic import BaseModel, Field, model_validator
class PerformanceRequest(BaseModel):
    total_solved: int = Field(ge=0)
    easy_count: int = Field(ge=0)
    medium_count: int = Field(ge=0)
    hard_count: int = Field(ge=0)
    @model_validator(mode="after")
    def validate_problem_counts(self):
        difficulty_total = (
            self.easy_count
            + self.medium_count
            + self.hard_count
        )
        if self.total_solved != difficulty_total:
            raise ValueError(
                "total_solved must equal the sum of difficulty counts"
            )
        return self
class PerformanceResponse(BaseModel):
    score: float
    level: str
    total_solved: int
    progress_score: float
    difficulty_score: float