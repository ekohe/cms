#!/bin/bash

SOURCE_BUCKET="ekohe-website-images-dev"
DESTINATION_BUCKET="ekohe-website-images-staging"
PERMISSIONS="--grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers"

aws s3 cp s3://$SOURCE_BUCKET/af9f/logo.svg s3://$DESTINATION_BUCKET/af9f/logo.svg $PERMISSIONS
aws s3 cp 's3://'"$SOURCE_BUCKET"'/37c7/airpocalypse screenshots.jpg' 's3://'"$DESTINATION_BUCKET"'/37c7/airpocalypse screenshots.jpg' $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/0878/vancouver.jpg s3://$DESTINATION_BUCKET/0878/vancouver.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/f48f/team_icon.svg s3://$DESTINATION_BUCKET/f48f/team_icon.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/c537/project_icon.svg s3://$DESTINATION_BUCKET/c537/project_icon.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/4be3/Jingan_Temple.jpg s3://$DESTINATION_BUCKET/4be3/Jingan_Temple.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/8052/bcg.svg s3://$DESTINATION_BUCKET/8052/bcg.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/f5ed/rocketfuel-logo.svg s3://$DESTINATION_BUCKET/f5ed/rocketfuel-logo.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/8230/design_icon.svg s3://$DESTINATION_BUCKET/8230/design_icon.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/0e82/dev_icon.svg s3://$DESTINATION_BUCKET/0e82/dev_icon.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/ea0f/plan_icon.svg s3://$DESTINATION_BUCKET/ea0f/plan_icon.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/96bb/swift_logo.svg s3://$DESTINATION_BUCKET/96bb/swift_logo.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/bed2/rails_logo.svg s3://$DESTINATION_BUCKET/bed2/rails_logo.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/524a/paid_lunch.svg s3://$DESTINATION_BUCKET/524a/paid_lunch.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/74cb/awesome_party.svg s3://$DESTINATION_BUCKET/74cb/awesome_party.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/fdc9/active_projects.svg s3://$DESTINATION_BUCKET/fdc9/active_projects.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/0028/app_downloads.svg s3://$DESTINATION_BUCKET/0028/app_downloads.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/d57c/product_launches.svg s3://$DESTINATION_BUCKET/d57c/product_launches.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/e3ad/team_members.svg s3://$DESTINATION_BUCKET/e3ad/team_members.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/8aae/develop_process.svg s3://$DESTINATION_BUCKET/8aae/develop_process.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/dfd7/design_process.svg s3://$DESTINATION_BUCKET/dfd7/design_process.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/f850/culture01.jpg s3://$DESTINATION_BUCKET/f850/culture01.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/0ae8/culture02.jpg s3://$DESTINATION_BUCKET/0ae8/culture02.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/3ef7/culture03.jpg s3://$DESTINATION_BUCKET/3ef7/culture03.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/a2b6/culture04.jpg s3://$DESTINATION_BUCKET/a2b6/culture04.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/2475/culture05.jpg s3://$DESTINATION_BUCKET/2475/culture05.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/6de3/paris_small.jpg s3://$DESTINATION_BUCKET/6de3/paris_small.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/f3e2/tokyo_small.jpg s3://$DESTINATION_BUCKET/f3e2/tokyo_small.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/df0d/shanghai_small.jpg s3://$DESTINATION_BUCKET/df0d/shanghai_small.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/99d0/vancouver_small.jpg s3://$DESTINATION_BUCKET/99d0/vancouver_small.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/210a/lettrs_logo.png s3://$DESTINATION_BUCKET/210a/lettrs_logo.png $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/2a21/hbs_logo.svg s3://$DESTINATION_BUCKET/2a21/hbs_logo.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/197a/figaro_logo.png s3://$DESTINATION_BUCKET/197a/figaro_logo.png $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/13cd/airpocalypse_logo.svg s3://$DESTINATION_BUCKET/13cd/airpocalypse_logo.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/aa77/kangu_logo.svg s3://$DESTINATION_BUCKET/aa77/kangu_logo.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/1494/pyro_logo.svg s3://$DESTINATION_BUCKET/1494/pyro_logo.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/7aba/lettrs_small_picture.jpg s3://$DESTINATION_BUCKET/7aba/lettrs_small_picture.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/2809/hbs_small_picture.jpg s3://$DESTINATION_BUCKET/2809/hbs_small_picture.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/cb19/figaro_small_picture.jpg s3://$DESTINATION_BUCKET/cb19/figaro_small_picture.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/f6a7/airpocalypse_small_picture.jpg s3://$DESTINATION_BUCKET/f6a7/airpocalypse_small_picture.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/658b/kangu_small_picture.jpg s3://$DESTINATION_BUCKET/658b/kangu_small_picture.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/3ee2/pyro_small_picture.jpg s3://$DESTINATION_BUCKET/3ee2/pyro_small_picture.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/59fa/marker.png s3://$DESTINATION_BUCKET/59fa/marker.png $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/ee0a/shushana_banner.jpg s3://$DESTINATION_BUCKET/ee0a/shushana_banner.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/5498/maxence.jpg s3://$DESTINATION_BUCKET/5498/maxence.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/27b0/shushana.jpg s3://$DESTINATION_BUCKET/27b0/shushana.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/ac48/IMG_0824.jpg s3://$DESTINATION_BUCKET/ac48/IMG_0824.jpg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/b8fe/linkedin.svg s3://$DESTINATION_BUCKET/b8fe/linkedin.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/6b22/twitter.svg s3://$DESTINATION_BUCKET/6b22/twitter.svg $PERMISSIONS
aws s3 cp s3://$SOURCE_BUCKET/ba69/facebook.svg s3://$DESTINATION_BUCKET/ba69/facebook.svg $PERMISSIONS
