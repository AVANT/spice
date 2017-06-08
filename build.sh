#!/bin/bash

# include keys
. "../.keys"

# precompile paths
static=$AVANT/beta/static/
layouts=$AVANT/beta/layouts/
content=$AVANT/beta/content/
archetypes=$AVANT/beta/archetypes/
src=$AVANT/beta/src/
objects=$AVANT/objects/

# rebuilding image index
printf "rebuilding image index"
bash ./dimensions.sh

# compile css
stylus src/styl/world.styl -o static/styles/world.css --compress

# copy over src assets
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

