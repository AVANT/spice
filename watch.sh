#!/bin/sh

static=$AVANT/alpha/static/
layouts=$AVANT/alpha/layouts/
content=$AVANT/alpha/content/
archetypes=$AVANT/alpha/archetypes/
objects=$AVANT/objects/

printf "watching directories:\n$static\n$layouts\n$content\n$archetypes\n$objects\n\n"

while inotifywait -qre modify "$static" "$layouts" "$content" "$archetypes" "$objects"; do
#	rm -rf $AVANT/alpha/public/* && chmod 755 public/
	#sudo hugo && sudo chown -R hxrts:www-data public #&& chmod -R a+r public && chmod -R a+r static && chmod -R a+r ../objects
	hugo
done
