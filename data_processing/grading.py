# from data_processing import Dependency
import time

WEIGHT_LAST_UPDATE = 0.1
WEIGHT_UPDATES_FRQUENCY = 0.1
# WEIGHT_VERSION_COUNT = 0.1
WEIGHTS_SUM = (
    WEIGHT_LAST_UPDATE +
    WEIGHT_UPDATES_FRQUENCY
    # WEIGHT_VERSION_COUNT
)

GRADES_NAMES = ['overall_grade', 'last_update_grade', 'updates_frequency_grade']
# WEIGHT_LAST_FREQUENCY = 0.1


def grade_project(project_dependencies) -> dict:
    dependencies_grades = [
        grade_dependency(dependency) for dependency
        in project_dependencies.dependencies
    ]

    deps_number = len(dependencies_grades)

    # dictionary = {
    #     'project_grade': {
    #         'overall_grade': None,
    #         'last_update_grade': None,
    #         'updates_frequency_grade': None
    #     },
    #     'dependencies_grades': {}
    # }

    dictionary = {
        'project_grade': {},
        'dependencies_grades': {}
    }

    # filling dictionary['project_grade']
    for grade_name in GRADES_NAMES:
        sum_val = sum(
            [
                dependency_grade[list(dependency_grade.keys())[0]][grade_name] for dependency_grade
                in dependencies_grades
            ]
        ) / deps_number
        dictionary['project_grade'][grade_name] = sum_val

    # filling dependencies_dictionary
    for dependency_grade in dependencies_grades:
        dependecy_name = list(dependency_grade.keys())[0]
        dictionary['dependencies_grades'][dependecy_name] = dependency_grade

    print(dictionary)
    return dictionary


def grade_dependency(dependency) -> float:
    last_update_grade = grade_last_update(dependency)
    updates_frequency_grade = grade_updates_frequency(dependency)
    # version_count_grade = grade_version_count(dependency)
    overall_grade = sum([
        last_update_grade * WEIGHT_LAST_UPDATE,
        updates_frequency_grade * WEIGHT_UPDATES_FRQUENCY
        # version_count_grade * WEIGHT_VERSION_COUNT
    ]) / WEIGHTS_SUM

    return {
        dependency.artifact_id: {
            "overall_grade": overall_grade,
            "last_update_grade": last_update_grade,
            "updates_frequency_grade": updates_frequency_grade
            # "version_count_grade": version_count_grade
        }
    }


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


def grade_updates_frequency(dependency) -> float:
    c = 6  # parameter describing 

    if dependency.version < 49:
        grade_function = 6*c + 3
    elif dependency.grade_version_count > 50 and dependency.grade_version_count < 99:
        grade_function = 2*c + 25
    else:
        grade_function = c + 10

    return grade_function


# def grade_updates_frequency(dependency) -> float:
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
