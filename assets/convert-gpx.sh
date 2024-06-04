#!/bin/bash

# Usage: bash convert-gpx.sh *.gpx

COUNTER=0

echo '['

for file in "$@"; do
  ((COUNTER++))

  TRACK_NAME=$(echo -n "$file" | sed 's/.*\///' | sed 's/.gpx$//')
  echo -n '{"name": "'${TRACK_NAME}'", "points": ['
  cat "$file" | awk '/<trkpt/ {print $0}' | awk -F'[^0-9.-]+' '{printf "[%s, %s],", $2, $3}' | sed 's/,$//'

  # Skip trailing comma on last track
  if [ $COUNTER -eq "$#" ]; then
    echo ']}'
  else
    echo ']},'
  fi

done

echo ']'

