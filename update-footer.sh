#! /bin/bash

# Replaces anything between <!-- Footer -- and </footer> with the contents of
# footer.txt for all html files in the current directory
perl -i -p0e 's/<!-- Footer --(.|\n)*<\/footer>\n/`cat footer.txt`/se' *.html
