#!/bin/bash
BUCKET="ekohe-website-images"

aws s3 cp s3://$BUCKET s3://$BUCKET --recursive  --acl public-read --metadata-directive REPLACE --cache-control max-age=2592000 --exclude logs/*
