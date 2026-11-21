from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from app.schemas.consistency import (
    ConsistencyRequest,
    ConsistencyResponse,
)
from app.schemas.ml_prediction import (
    WeeklyPredictionRequest,
    WeeklyPredictionResponse,
)
from app.schemas.ml_streak_prediction import (
    MLStreakPredictionRequest,
    MLStreakPredictionResponse,
)
from app.schemas.performance import (
    PerformanceRequest,
    PerformanceResponse,
)
from app.schemas.recommendation import (
    RecommendationRequest,
    RecommendationResponse,
)
from app.schemas.topic import (
    WeakTopicRequest,
    WeakTopicResponse,
)
from app.services.consistency_service import analyze_consistency
from app.services.ml_prediction_service import predict_next_week
from app.services.ml_streak_prediction_service import predict_ml_streak_risk
from app.services.performance_service import calculate_performance
from app.services.recommendation_service import (
    generate_recommendations,
    get_topic_recommendations,
)
from app.services.topic_service import detect_weak_topics

app = FastAPI(
    title="CodePulse AI Service",
    version="1.0.0",
)


class TestRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {
        "message": "CodePulse AI Service is running"
    }


@app.get("/health")
def health():
    return {
        "status": "UP"
    }


@app.post("/ai/test")
def test_ai(request: TestRequest):
    return {
        "message": "Hello from CodePulse AI Service",
        "received": request.message,
    }


@app.post(
    "/ai/performance-score",
    response_model=PerformanceResponse,
)
def performance_score(data: PerformanceRequest):
    return calculate_performance(data)


@app.post(
    "/ai/weak-topics",
    response_model=WeakTopicResponse,
)
def weak_topics(data: WeakTopicRequest):
    return detect_weak_topics(data)


@app.post(
    "/ai/consistency",
    response_model=ConsistencyResponse,
)
def consistency_analysis(data: ConsistencyRequest):
    return analyze_consistency(data)


@app.post(
    "/ai/streak-prediction",
    response_model=MLStreakPredictionResponse,
)
def streak_prediction(data: MLStreakPredictionRequest):
    return predict_ml_streak_risk(data)


@app.post(
    "/ai/recommendations",
    response_model=RecommendationResponse,
)
def recommendations(data: RecommendationRequest):
    return generate_recommendations(data)


@app.post(
    "/ai/predict-next-week",
    response_model=WeeklyPredictionResponse,
)
def predict_weekly_problems(data: WeeklyPredictionRequest):
    return predict_next_week(data)


@app.get("/ai/topic-recommendations/{user_id}")
def topic_recommendations(user_id: int):
    try:
        return get_topic_recommendations(user_id)
    except ValueError as error:
        raise HTTPException(
            status_code=404,
            detail=str(error),
        )


@app.post(
    "/ai/ml-streak-risk",
    response_model=MLStreakPredictionResponse,
)
def ml_streak_prediction(data: MLStreakPredictionRequest):
    return predict_ml_streak_risk(data)