#!/bin/sh

# tag version
git tag
read -p "Tag current version with: " VERSION
git tag -a $VERSION -m "$(date "+%H:%M:%S   %d/%m/%y")"
git push --follow-tags

# build paths
STAGING=$AVANT/alpha/
PRODUCTION=$AVANT/production/public
LOG=$AVANT/alpha/deploy.log
TMP=`mktemp -d`

# execute build to tmp directory
echo "building from $STAGING"
hugo --source="$STAGING" --destination="$TMP" --logFile="$LOG"

# rsync tmp to production
if [ $? -eq 0 ]; then
	echo "syncing to $PRODUCTION"
	rsync -aq --delete "$TMP/" "$PRODUCTION"
fi

# remove tmp directory
echo "cleaning up"
rm -r $TMP
