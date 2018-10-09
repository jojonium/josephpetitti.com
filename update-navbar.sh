#! /bin/bash

# Replaces anything between <!-- Nav -- and </nav> with the contents of
# navbar.txt for all html files in the current directory
perl -i -p0e 's/<!-- Nav --(.|\n)*<\/nav>/`cat navbar.txt`/se' *.html
