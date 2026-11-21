
import numpy as np
import pandas as pd


def create_features(data):

    # Create a copy to protect original data
    result = data.copy()

    # 1. Weekly activity consistency
    result["activity_consistency"] = (
        result["active_days_last_7"] / 7
    )

    # 2. Problems solved per active day
    result["problems_per_active_day"] = np.where(
        result["active_days_last_7"] > 0,
        result["problems_last_7"] /
        result["active_days_last_7"],
        0
    )

    # 3. Recent inactivity ratio
    result["inactivity_ratio"] = (
        result["days_since_last_solve"] / 7
    )

    return result
