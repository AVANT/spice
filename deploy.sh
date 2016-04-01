#!/bin/sh

git tag

read -p "Tag current version with: " VERSION

git tag -a $VERSION -m "$(date "+%H:%M:%S   %d/%m/%y")"

git push --follow-tags

SOURCE=$AVANT/alpha/
DESTINATION=$AVANT/production/
LOG=$AVANT/alpha/deploy.log
TEMP=`mktemp -d`

echo "Building from $SOURCE"
hugo --source="$SOURCE" --destination="$TEMP" --logFile="$LOG"
if [ $? -eq 0 ]; then
	echo "Syncing to $DESTINATION"
	rsync -aq --delete "$TEMP/" "$DESTINATION"
fi
echo "Cleaning up"
rm -r $TEMP
