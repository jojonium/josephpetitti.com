#!/bin/bash

# This should be run from the same directory of the site files

if [ ! -d ".git" ]; then
	rm -r ./*
	git clone https://github.com/jojonium/josephpetitti.com.git .
fi

git checkout -- index.html
git pull origin master
bash ./statistics.sh
