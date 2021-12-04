from data_processing.data_processing import ProjectDependencies
from grading import grade_project

if __name__ == 'main':
    project_dependencies = ProjectDependencies('data_to_process.json')
    project_grade = grade_project(project_dependencies)
