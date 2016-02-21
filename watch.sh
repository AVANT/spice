#!/bin/sh

static=/home/hxrts/projects/avant/staging/static/
layouts=/home/hxrts/projects/avant/staging/layouts/
content=/home/hxrts/projects/avant/staging/content/
archetypes=/home/hxrts/projects/avant/staging/archetypes/
objects=/home/hxrts/projects/avant/objects/

printf "watching directories:\n$static\n$layouts\n$content\n$archetypes\n$objects\n\n"

while inotifywait -qre modify "$static" "$layouts" "$content" "$archetypes" "$objects"; do
	hugo && chmod -R a+r public && chmod -R a+r static && chmod -R a+r ../objects
done
