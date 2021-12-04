from data_processing import ProjectDependencies
import grading
import json

if __name__ == '__main__':
    project_dependencies = ProjectDependencies('data_to_process.json')
    project_grade = grading.grade_project(project_dependencies)

    with open('output.json', 'w') as file:
        json.dump(project_grade, file)
