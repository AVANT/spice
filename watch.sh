#!/bin/bash

# include keys
. "../.keys"

# precompile paths
static=$AVANT/alpha/static/
layouts=$AVANT/alpha/layouts/
content=$AVANT/alpha/content/
archetypes=$AVANT/alpha/archetypes/
src=$AVANT/alpha/src/
objects=$AVANT/objects/

# print status
printf '%s\n---\n' "- watching"

# build loop
while inotifywait -qre modify \
"$static" "$layouts" "$content" "$archetypes" "$objects" "$src"; do

	# compile css
	stylus src/styl/world.styl -o static/styles/world.css --compress

	# copy over src assets
	cp -r src/js static/
	cp -r src/assets/* static/

	# update public status page
	cat $AVANT/status/head.txt > $AVANT/status/html/index.html
	date "+%H:%M:%S   %d/%m/%y" >> $AVANT/status/html/index.html
	echo '<br>' >> $AVANT/status/html/index.html
	hugo 2>&1 | tee >(sed 's/$/<br>/' >> $AVANT/status/html/index.html)
	cat $AVANT/status/tail.txt >> $AVANT/status/html/index.html

	# set cloudflare development mode to true
	curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$cloudflare_zone/settings/development_mode" \
		-H "X-Auth-Email: $cloudflare_user" \
		-H "X-Auth-Key: $cloudflare_key" \
		-H "Content-Type: application/json" \
		--data '{"value":"on"}' | \
		jq . > /dev/null

	printf '%s---\n'

done
