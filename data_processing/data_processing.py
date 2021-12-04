"""
This module is responsible for data processing.
"""

import pandas as pd
import requests
import json
import time
from api_management import ask_api_package_details

class Dependency:
    def __init__(self, _group_id, _artifact_id, _packaging, _version, _scope):
        self.group_id = _group_id
        self.artifact_id = _artifact_id
        self.packaging = _packaging
        self.version = _version
        self.scope = _scope
        self.is_equal = None
        self.latest_version = None
        self.timestamp = None
        self.version_count = None
    
    def __str__(self):
        return f"{self.group_id}, {self.artifact_id}, {self.packaging}, {self.version}, {self.scope}, {self.is_equal}, {self.latest_version}, {self.timestamp}, {self.version_count}"

class ProjectDependencies:
    def __init__(self, _filename):
        self.dependencies = []
        self.filename = _filename
        self.get_dependencies(self.filename)
        self.get_remote_additional_data()
        self.compare_versions()
    
    def get_dependencies(self, filename: str) -> pd.DataFrame:
        with open(filename, 'r', encoding='utf8') as file:
            data = json.load(file)

        for i, dependency_string in enumerate(data['dependencies'][1:]):
            dep_data = dependency_string.split(':')  # dependencies_df.loc[i]
            dependency = Dependency(dep_data[0], dep_data[1], dep_data[2], dep_data[3], dep_data[4])
            self.dependencies.append(dependency)

    def get_remote_additional_data(self) -> pd.DataFrame :
        """
        Returns dataframe with additional data regarding dependencies.
        """
        
        # new dataframe that will additional information got from api call
        api_call_columns = ['artifact_id', 'latest_version', 'version_api', 'timestamp']
        api_call_df = pd.DataFrame(columns=api_call_columns)
        
        for dependency in self.dependencies:  # iterate through dataframe 
            group_id = dependency.group_id
            artifact_id = dependency.artifact_id

            start = time.time()
            response = ask_api_package_details(group_id, artifact_id)
            print(time.time()-start)

            dependency.latest_version = response['response']['docs'][0]['latestVersion']
            dependency.timestamp = response['response']['docs'][0]['timestamp']
            dependency.version_count = response['response']['docs'][0]['versionCount']

    def compare_versions(self) -> None:
        for dependency in self.dependencies:
            dependency.is_equal = dependency.latest_version == dependency.version 
             

deps= ProjectDependencies('data_to_process.json')
for dependency in deps.dependencies:
    print(dependency)