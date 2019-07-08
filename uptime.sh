#! /bin/bash
# put this in crontab as:
#   0 * * * * /path/to/here/uptime.sh
# to make it run every hour

# get uptime in hours
hours=$(awk '{print int($1/3600)}' /proc/uptime)

sed -i "s/<!--UPTIME-->[0-9]*<!--\/UPTIME-->/<!--UPTIME-->$hours<!--\/UPTIME-->/g" index.html
