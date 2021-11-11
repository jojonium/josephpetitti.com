#!/bin/bash

# The directory where you want the site files
DIR="/usr/share/nginx/html"

if [ ! -d "$DIR/.git" ]; then
	rm -r "$DIR"
	git clone https://github.com/jojonium/josephpetitti.com.git "$DIR"
fi

cd "$DIR"
git checkout -- index.html
git pull origin master
bash ./statistics.sh
