#!/bin/bash

# include keys
. ".keys"

# precompile paths
objects=$AVANT/objects/

printf '%s\n---\n' "- watching $objects"

# build loop
while inotifywait -qre modify \
"$objects"; do

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

	# write json file
	printf '%s\n' "{\"url\" : \"\"}" >> data/dimensions.json
	printf '%s\n' "]}" >> data/dimensions.json

	printf '%s\n' "---"

	# set cloudflare development mode to true
	curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$cloudflare_zone/settings/development_mode" \
		-H "X-Auth-Email: $cloudflare_user" \
		-H "X-Auth-Key: $cloudflare_key" \
		-H "Content-Type: application/json" \
		--data '{"value":"on"}' | \
		jq . > /dev/null
done
