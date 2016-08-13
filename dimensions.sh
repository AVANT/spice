#!/bin/bash

# objects path
objects=$AVANT/objects/

# print status
printf '%s\n' "querying image dimensions from $objects"

printf '%s\n' "{\"images\" : [" > data/dimensions.json

for file in $(find ../objects -name '*' -exec file {} \; | grep -o -P '^.+: \w+ image' | cut -d ':' -f1); do

	info=$(identify -ping -format '%d/%f %w %h' $file[0] | cut -d '/' -f3-)

	path="http://objects.avant.org/$(echo "$info" | cut -d " " -f1)"
	width="$(echo "$info" | cut -d " " -f2)"
	height="$(echo "$info" | cut -d " " -f3)"
	ratio=$(echo "scale=6; $height/$width*100" | bc)

	printf '%s\n' "{" >> data/dimensions.json
	printf '%s\n' "\"url\" : \"$path\"," >> data/dimensions.json
	printf '%s\n' "\"width\" : \"$width\"," >> data/dimensions.json
	printf '%s\n' "\"height\" : \"$height\"," >> data/dimensions.json
	printf '%s\n' "\"ratio\" : \"$ratio\"" >> data/dimensions.json
	printf '%s\n' "}," >> data/dimensions.json

done

printf '%s\n' "{\"url\" : \"\"}" >> data/dimensions.json
printf '%s\n' "]}" >> data/dimensions.json

printf '%s\n' "[done]"
