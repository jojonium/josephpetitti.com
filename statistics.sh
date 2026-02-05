#! /bin/bash
# put this in crontab as:
#   0 * * * * /path/to/here/statistics.sh
# to make it run every hour

addCommas()
{
	thousands=$1
	remainder=""
	result=""
	while [ $thousands -gt 999 ]; do
		remainder=$(($thousands % 1000))

		while [ ${#remainder} -lt 3 ]; do
			remainder="0$remainder"
		done

		result=",${remainder}${result}"
		thousands=$(($thousands / 1000))
	done

	result="${thousands}${result}"

	echo $result
}


# get uptime in hours
hours=$(addCommas $(awk '{print int($1/3600)}' /proc/uptime))

sed -i "s/<!--UPTIME-->[0-9]*<!--\/UPTIME-->/<!--UPTIME-->$hours<!--\/UPTIME-->/g" index.html

