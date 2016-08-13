#!/bin/sh

#--------
# git tag
#--------

# tag version
git tag
read -p "Tag current version with: " VERSION
git tag -a $VERSION -m "$(date "+%H:%M:%S   %d/%m/%y")"
git push --follow-tags


#----------------
# building assets 
#----------------

# compile css
stylus src/styl/world.styl -o static/styles/world.css --compress

# copy over src assets
cp -r src/assets/* static/


#--------------------------
# update public status page
#---------------------------

cat $AVANT/status/head.txt > $AVANT/status/html/index.html
date "+%H:%M:%S   %d/%m/%y" >> $AVANT/status/html/index.html
echo '<br>' >> $AVANT/status/html/index.html
hugo 2>&1 | tee >(sed 's/$/<br>/' >> $AVANT/status/html/index.html)
cat $AVANT/status/tail.txt >> $AVANT/status/html/index.html


#---------------------
# deploy to production
#---------------------

cp -R $AVANT/alpha/static $AVANT/beta/static
cp -R $AVANT/alpha/layouts $AVANT/beta/layouts
cp -R $AVANT/alpha/archetypes $AVANT/beta/archetypes
cp -R $AVANT/alpha/src $AVANT/beta/src

# print status
printf "deplying directories: static, layouts, archetypes, src"
