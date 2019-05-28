#!/bin/bash

if [ $# -lt 5 ]; then
   echo "Usage: ./md2blog title description image url markdown"
   exit 1
else
	echo '<!doctype html>' >> $4.html
	echo '  <head>' >> $4.html
	echo '    <meta http-equiv="content-type" content="text/html; charset=utf-8" />' >> $4.html
	echo '    <title>'$1'</title>' >> $4.html
	echo '    <meta name="description" content="'$2'" />' >> $4.html
	echo '    <meta property="og:title" content="'$1'" />' >> $4.html
	echo '    <meta property="og:description" content="'$2'" />' >> $4.html
	echo '    <meta property="og:image" content="https://josephpetitti.com/blog/images/'$3'" />' >> $4.html
	echo '    <meta property="og:type" content="article" />' >> $4.html
	echo '    <meta property="og:url" content="https://josephpetitti.com/blog/'$4'" />' >> $4.html
	echo '    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, width=device-width, user-scalable=no" />' >> $4.html
	cat template-top.html >> $4.html
	echo '      <span class="date"><time datetime="'$(date +%Y-%m-%d)'">'$(date +%B)' '$(date +%-d)', '$(date +%Y)'</span>' >> $4.html
	echo '' >> $4.html
	pandoc -f markdown -t html $5 | sed 's/^/      /' >> $4.html
fi
