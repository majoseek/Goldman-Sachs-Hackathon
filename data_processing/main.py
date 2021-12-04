from data_processing.data_processing import ProjectDependencies
from grading import grade_project
import json

if __name__ == 'main':
    project_dependencies = ProjectDependencies('data_to_process.json')
    project_grade = grade_project(project_dependencies)

    with open('output.json', 'w') as file:
        json.dump(project_grade, file)
