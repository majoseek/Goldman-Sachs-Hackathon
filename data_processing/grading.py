# from data_processing import Dependency
import time

WEIGHT_LAST_UPDATE = 0.1
WEIGHT_VERSION_COUNT = 0.1
# WEIGHT_LAST_FREQUENCY = 0.1

def grade_dependency(dependecny) -> float:
    grade = sum([
        grade_last_update(dependency) * WEIGHT_LAST_UPDATE,
        grade_version_count(dependency) * WEIGHT_VERSION_COUNT
    ])

    return grade

def grade_last_update(dependency) -> float:
    timestamp = dependency.timestamp
    seconds_from_timestamp = time.time() - timestamp
    days_from_timestamp = (
        seconds_from_timestamp / 60 / 60 / 24 
    )

    max_days = 30

    if days_from_timestamp > max_days:
        grade = 0
    else:
        grade = 1 - (days_from_timestamp) / max_days

    return grade


def grade_version_count(dependency) -> float:
    version_count = dependency.version_count
    
    first_version_timestamp = None
    seconds_from_first = time.time() - first_version_timestamp
    days_from_first = (
        seconds_from_first / 60 / 60 / 24 
    )

    mean_period = days_from_first / version_count

    max_period = 50

    if mean_period > max_period:
        grade = 0
    else:
        grade = 1 - (mean_period) / max_period

    return grade
# def grade_update_frequency(dependency) -> float:
#     version_count = dependency.version_count
    
#     first_version_timestamp = None
#     seconds_from_first = time.time() - first_version_timestamp
#     days_from_first = (
#         seconds_from_first / 60 / 60 / 24 
#     )

#     mean_period = days_from_first / version_count

#     max_period = 50

#     if mean_period > max_period:
#         grade = 0
#     else:
#         grade = 1 - (mean_period) / max_period

#     return grade


