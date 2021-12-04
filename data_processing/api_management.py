"""
This module is responsible for api connection
"""

import requests

def ask_api_package_details(group_id: str, artifact_id: str):
    api_request = f"https://search.maven.org/solrsearch/select?q=g:%22{group_id}%22%20AND%20a:%22{artifact_id}%22&rows=20&wt=json"
    
    response = requests.get(api_request)  # ask for request
    
    return response.json()