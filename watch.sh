#!/bin/bash

static=$AVANT/alpha/static/
layouts=$AVANT/alpha/layouts/
content=$AVANT/alpha/content/
archetypes=$AVANT/alpha/archetypes/
src=$AVANT/alpha/src/
objects=$AVANT/objects/

printf "watching directories:\n$static\n$layouts\n$content\n$archetypes\n$src\n$objects\n\n"

while inotifywait -qre modify "$static" "$layouts" "$content" "$archetypes" "$objects" "$src"; do
	stylus src/styl/world.styl -o static/styles/world.css --compress
	#	rm -rf $AVANT/alpha/public/* && chmod 755 public/
	#sudo hugo && sudo chown -R hxrts:www-data public #&& chmod -R a+r public && chmod -R a+r static && chmod -R a+r ../objects
	cat $AVANT/status/head.txt > $AVANT/status/html/index.html
	date "+%H:%M:%S   %d/%m/%y" >> $AVANT/status/html/index.html
	echo '<br>' >> $AVANT/status/html/index.html
	hugo 2>&1 | tee >(sed 's/$/<br>/' >> $AVANT/status/html/index.html) 
	cat $AVANT/status/tail.txt >> $AVANT/status/html/index.html
done
