#! /bin/bash
# put this in crontab as:
#   0 * * * * /path/to/here/statistics.sh
# to make it run every hour

# get uptime in hours
hours=$(awk '{print int($1/3600)}' /proc/uptime)

# get contributions
contribs=$(python3 './get-contributions.py')

sed -i "s/<!--UPTIME-->[0-9]*<!--\/UPTIME-->/<!--UPTIME-->$hours<!--\/UPTIME-->/g" index.html

sed -i "s/<!--CONTRIBUTIONS-->[0-9,]*<!--\/CONTRIBUTIONS-->/<!--CONTRIBUTIONS-->$contribs<!--\/CONTRIBUTIONS-->/g" index.html
