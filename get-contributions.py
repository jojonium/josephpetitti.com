import json
import requests
from bs4 import BeautifulSoup

"""
GitHub doesn't have an API endpoint for getting the 'total contributions' thing
that's displayed on profile pages, so we'll just scrape the page to get it
"""

GITHUB_URL = 'https://github.com/'
username = 'jojonium'

response = requests.get('{0}{1}'.format(GITHUB_URL, username))
if not response.ok:
    print("ERROR")
bs = BeautifulSoup(response.content, "html.parser")
total = bs.find('div', {'class': 'js-yearly-contributions'}).findChildren('h2')[0]
contributions = total.text.split()[0]
print(contributions)

