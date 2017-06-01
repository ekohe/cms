# Ekohe 6

## Project setup

1. Install / update homebrew: http://brew.sh

2. Install mongodb

`brew install mongodb`

3. Install nodejs / meteor

`curl https://install.meteor.com/ | sh`

4. Clone this repository

`git clone gitlab@gitlab.ekohe.com:ekohe/ekohe6`

5. If you use Sublime Text, install the JSX package.

 - Apple + Shift + P
 - Install package
 - Search JSX
 - Install

6. Install the NPM packages required:

 - in frontend/

`npm install`

 - in admin/

`npm install`

7. Setup settings.json for the frontend and the admin using those templates: https://red.ekohe.com/projects/ekohe-website-2015/wiki/Amazon_S3_and_Cloudfront_configuration

## Startup

1. Start mongodb

`mongod --config /usr/local/etc/mongod.conf`

3. Start the frontend app

`cd frontend`

`export MONGO_URL=mongodb://localhost:27017/ekohe6`

`meteor --settings ./settings.json`

3. Start the admin app

`cd admin`

`export MONGO_URL=mongodb://localhost:27017/ekohe6`

`meteor --port 4000 --settings ./settings.json`

## Logging in on the admin interface

If you are stuck at the "pending authorization" while trying to connect to the admin interface, you can authorize yourself like this:

1. Run a meteor shell:

`meteor shell`

2. Update the authorized to true in the database:

`Meteor.users.update({_id: Meteor.users.find({}).fetch()[0]._id}, { $set: { authorized: true } });`


## Libraries

1. Material-ui: http://www.material-ui.com
2. React
3. React router: https://themeteorchef.com/snippets/react-router-basics/
4. Redux

## Sync prod to staging

1. First run `mina production backup` from local frontend directory
2. Go to the server `ssh nuri.ekohe.com`
3. Go to the staging shared backup folder `cd /var/www/staging/ekohe6-frontend/shared/backups`
4. Delete the previously loaded backups if any (backup.tar.bz2 & ekohe6 folder)
5. Copy the production backup file to this directory `cp /var/www/production/ekohe6-frontend/shared/backups/backup.tar.bz2 ./`
6. Extract the archive `tar xvjf backup.tar.bz2`
7. Load the backup to the staging database `mongorestore --drop -d ekohe6_staging ./ekohe6/`
8. Sync the pictures:

aws s3 sync s3://ekohe-website-images s3://ekohe-website-images-staging --exclude logs/*


