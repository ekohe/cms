#!/bin/bash

DIR=$( cd "$( /usr/bin/dirname "${BASH_SOURCE[0]}" )" && /bin/pwd )
cd "$DIR/frontend"
mina production backup
cd "$DIR"
scp ekohe.com:/var/www/production/ekohe6-frontend/shared/backups/backup.tar.bz2 ./
tar xvjf backup.tar.bz2
rm backup.tar.bz2
mongorestore --drop -d ekohe6 ./ekohe6/
rm -rf ekohe6

# SOURCE_BUCKET="ekohe-website-images"
# DESTINATION_BUCKET="ekohe-website-images-dev"
# aws s3 sync s3://$SOURCE_BUCKET s3://$DESTINATION_BUCKET --exclude logs/*
