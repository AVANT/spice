#!/bin/sh

static=$AVANT/staging/static/
layouts=$AVANT/staging/layouts/
content=$AVANT/staging/content/
archetypes=$AVANT/staging/archetypes/
objects=$AVANT/objects/

printf "watching directories:\n$static\n$layouts\n$content\n$archetypes\n$objects\n\n"

while inotifywait -qre modify "$static" "$layouts" "$content" "$archetypes" "$objects"; do
	hugo && chmod -R a+r public && chmod -R a+r static && chmod -R a+r ../objects
done
