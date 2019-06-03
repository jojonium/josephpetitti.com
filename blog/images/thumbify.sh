#! /bin/bash

# Creates a thumbnail of each argument with a width of 600 pixels.
# If the input file has the filename image.png, the output thumbnail will have
# the filename th_image.png

# check number of arguments
if [ "$#" -lt 1 ]; then
	echo "Usage: ./thumbify.sh file ...";
	exit 1;
fi

for arg in "$@"
do 
	convert -thumbnail 600 $arg th_$arg
done

