"""
This module is responsible for data processing.
"""

import pandas as pd
import requests
import json
import time
from api_management import ask_api_package_details, ask_api_timestamp_details
from datetime import datetime

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
        self.filename = _filename
        self.dependencies = self.get_dependencies(self.filename, 'dependencies')
        # self.get_remote_additional_data()
        self.compare_versions()
        self.get_remote_timestamp_data()

    def get_dependencies(self, filename: str, dependency_type: str) -> pd.DataFrame:
        with open(filename, 'r', encoding='utf8') as file:
            data = json.load(file)

        dependencies = []
        for dependency_string in data[dependency_type][1:]:
            dep_data = dependency_string.split(':')  # dependencies_df.loc[i]
            dependency = Dependency(dep_data[0], dep_data[1], dep_data[2], dep_data[3], dep_data[4])
            dependencies.append(dependency)
        
        return dependencies

    def get_remote_additional_data(self) -> pd.DataFrame :
        """
        Returns dataframe with additional data regarding dependencies.
        """
        
        # new dataframe that will additional information got from api call
        api_call_columns = ['artifact_id', 'latest_version', 'version_api', 'timestamp']
        
        for dependency in self.dependencies:  # iterate through dataframe 
            group_id = dependency.group_id
            artifact_id = dependency.artifact_id

            # start = time.time()
            response = ask_api_package_details(group_id, artifact_id)
            # print(time.time()-start)

            dependency.latest_version = response['response']['docs'][0]['latestVersion']
            dependency.timestamp = response['response']['docs'][0]['timestamp']
            dependency.version_count = response['response']['docs'][0]['versionCount']

    def compare_versions(self) -> None:
        for dependency in self.dependencies:
            dependency.is_equal = dependency.latest_version == dependency.version 

    def get_remote_timestamp_data(self) -> pd.DataFrame :
        """
        Returns dataframe with timestamp data regarding dependencies.
        """
        # PERIOD INDICATOR
        period = 1
        counter = 0

        # new dataframe that will additional information got from api call
        api_call_columns = ['artifact_id', 'latest_version', 'version_api', 'timestamp']
        
        considered_timestamps = pd.DataFrame(columns=['Date', 'Valid', 'Period'])

        for dependency in self.dependencies:  # iterate through packages
            group_id = dependency.group_id
            artifact_id = dependency.artifact_id

            response = ask_api_timestamp_details(group_id, artifact_id)  # get response from api

            # iterate through response docs
            for index in range(len(response['response']['docs'])):
                timestamp = response['response']['docs'][index]['timestamp']/1e3  # timestamp in seconds
                when_last_update = datetime.fromtimestamp(timestamp)
                
                difference_update = (datetime.now() - when_last_update).seconds
                valid = 0
                date = None
                

                if difference_update < 7776000:  # the timestamp is from the last 3 month
                    valid = 1
                    date = datetime.fromtimestamp(timestamp)

                data_d = {'Date': date,
                          'Valid': valid,
                          'Period': period}
                considered_timestamps = considered_timestamps.append(data_d, ignore_index=True)

        # considered_timestamps['Date'] = considered_timestamps['Date'].dt.strftime('%d-%m-%Y')
        print(considered_timestamps)
        
        # considered_timestamps = considered_timestamps.sort_values(by="Date", ascending=True)  # sort timestamps
        idx = pd.date_range(min(considered_timestamps['Date']), max(considered_timestamps['Date']), freq='D')
        print(considered_timestamps)
        
        considered_timestamps.set_index('Date', inplace=True)
        print(considered_timestamps)
        
        considered_timestamps.reindex(idx, fill_value=0)

        # considered_timestamps.Date = pd.DatetimeIndex(considered_timestamps.Date)

        # considered_timestamps = considered_timestamps.reindex(idx, fill_value = 0)

        print(considered_timestamps)
        
        # considered_timestamps = pd.DataFrame(columns=['Data'], data=considered_timestamps)

        # print(date_range)

        # data_df = data_df.sample(n=12).reset_index(drop=True)
        # print(data_df)
        # dependency.timestamps = data_df
        

deps = ProjectDependencies('data_to_process.json')

for dependency in deps.dependencies:
    print(dependency)