import json
import requests
from bs4 import BeautifulSoup

"""
Scrape a Letterboxd profile for total number of films watched
"""

LETTERBOXD_URL = 'https://letterboxd.com/'
username = 'jojonium'

response = requests.get('{0}{1}'.format(LETTERBOXD_URL, username))
if not response.ok:
    print("ERROR")
bs = BeautifulSoup(response.content, "html.parser")
total = bs.findAll('h4', {'class': 'profile-statistic'})[0].findChildren('span', {'class': 'value'})[0]
contributions = total.text.split()[0]
print(contributions)

