from fastapi import FastAPI
from app.schemas.performance import (
    PerformanceRequest,
    PerformanceResponse,
)
from app.services.performance_service import calculate_performance
from pydantic import BaseModel
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