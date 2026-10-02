from fastapi import FastAPI

app = FastAPI(
    title="CodePulse AI Service",
    version="1.0.0"
)


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