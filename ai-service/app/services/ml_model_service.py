
from pathlib import Path
from functools import lru_cache
import joblib

# Project root: ai-service
BASE_DIR = Path(__file__).resolve().parents[2]

ARTIFACT_DIR = BASE_DIR / "ml" / "artifacts"


@lru_cache(maxsize=4)
def load_model_artifact(model_name: str):

    model_path = ARTIFACT_DIR / model_name

    if not model_path.is_file():
        raise FileNotFoundError(
            f"ML model not found: {model_path}"
        )

    try:
        artifact = joblib.load(model_path)

    except Exception as error:
        raise RuntimeError(
            f"Unable to load ML model: {model_name}"
        ) from error

    if not isinstance(artifact, dict):
        raise ValueError(
            "Invalid model artifact format."
        )

    if "model" not in artifact or "features" not in artifact:
        raise ValueError(
            "Model artifact must contain model and features."
        )

    return artifact
