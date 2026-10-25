from pathlib import Path
import joblib
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error,root_mean_squared_error
from sklearn.model_selection import train_test_split
BASE_DIR=Path(__file__).resolve().parent.parent
ARTIFACT_DIR=BASE_DIR/"ml"/"artifacts"
MODEL_PATH=ARTIFACT_DIR/"linear_regression.joblib"
FEATURE_NAMES=[
    "problems_this_week","problems_last_week","active_days"
]
def create_sample_data():
    rng=np.random.default_rng(42)
    problems_this_week=rng.integers(0,31,size=300)
    problems_last_week=rng.integers(0,31,size=300)
    active_days=rng.integers(0,8,size=300)
    noise=rng.normal(0,2,size=300)
    problems_next_week=(0.45*problems_this_week+0.25*problems_last_week+1.1*active_days+noise)
    problems_next_week=np.maximum(0,np.round(problems_next_week).astype(int))
    X=np.column_stack((
        problems_this_week,problems_last_week,active_days
    ))
    y=problems_next_week
    return X,y

def train_model():
    X,y=create_sample_data()
    X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=42)
    model=LinearRegression()
    model.fit(X_train,y_train)
    predictions=model.predict(X_test)
    mae=mean_absolute_error(y_test,predictions)
    rmse=root_mean_squared_error(y_test,predictions)
    ARTIFACT_DIR.mkdir(parents=True,exist_ok=True)
    artifact = {
        "model": model,
        "feature_names": FEATURE_NAMES,
    }
    joblib.dump(artifact, MODEL_PATH)

    print("Model training completed.")
    print(f"Training samples: {len(X_train)}")
    print(f"Test samples: {len(X_test)}")
    print(f"Learned coefficients: {model.coef_}")
    print(f"Learned intercept: {model.intercept_:.3f}")
    print(f"Test MAE: {mae:.3f} problems")
    print(f"Test RMSE: {rmse:.3f} problems")
    print(f"Model saved to: {MODEL_PATH}")

if __name__ == "__main__":
    train_model()

