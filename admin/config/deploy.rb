#encoding: utf-8
require 'mina/multistage'
require 'mina/git'

set :domain, 'ekohe.com'
set :user, ENV['SSH_USER'] || `whoami`.chop
set :repository, 'gitlab@gitlab.ekohe.com:ekohe/ekohe6.git'

# Update this as necessary
set :meteor_release, '1.4.3.1'
set :meteor_platform, 'os.linux.x86_64'

# Manually create these paths in shared/ (eg: shared/config/database.yml) in your server.
# They will be linked in the 'deploy:link_shared_paths' step.
set :shared_paths, ['config/settings.json', 'log']
set :forward_agent, true     # SSH forward_agent.

# Put any custom mkdir's in here for when `mina setup` is ran.
task :setup => :environment do
  ['log', 'config', 'pids', 'node_modules', 'meteor', 'scripts'].each do |dir|
    queue! %[mkdir -p "#{deploy_to}/#{shared_path}/#{dir}"]
    queue! %[chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/#{dir}"]
  end

  queue! %[touch "#{deploy_to}/#{shared_path}/config/settings.json"]
  queue  %[echo "-----> Be sure to edit '#{deploy_to}/#{shared_path}/config/settings.json'."]

  if repository
    repo_host = repository.split(%r{@|://}).last.split(%r{:|\/}).first
    repo_port = /:([0-9]+)/.match(repository) && /:([0-9]+)/.match(repository)[1] || '22'

    queue %[
      if ! ssh-keygen -H  -F #{repo_host} &>/dev/null; then
        ssh-keyscan -t rsa -p #{repo_port} -H #{repo_host} >> ~/.ssh/known_hosts
      fi
    ]
  end
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  to :before_hook do
    # Put things to run locally before ssh
  end
  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'deploy:cleanup'

    to :launch do
      queue %[echo "-----> Installing npm packages"]
      queue %[if \[ -e "#{deploy_to}/#{current_path}/admin/node_modules" \]; then
                rm -rf #{deploy_to}/#{current_path}/admin/node_modules
              fi]
      queue %[ln -s #{deploy_to}/#{shared_path}/node_modules #{deploy_to}/#{current_path}/admin/node_modules]
      queue %[cd #{deploy_to}/#{current_path}/admin && npm install --production]

      queue %[echo "-----> Installing meteor #{meteor_release}"]

      meteor_url = "https://meteorinstall-4168.kxcdn.com/packages-bootstrap/#{meteor_release}/meteor-bootstrap-#{meteor_platform}.tar.gz"
      meteor_package_file = "meteor-bootstrap-#{meteor_release}-#{meteor_platform}.tar.gz"

      # If the package file doesn't exist, download and unpack it
      queue %[cd #{deploy_to}/#{shared_path}/meteor && \[ -f "#{meteor_package_file}" \] || (curl -o #{meteor_package_file} #{meteor_url} && rm -rf #{deploy_to}/#{shared_path}/meteor/.meteor && tar -xzf #{meteor_package_file} -C #{deploy_to}/#{shared_path}/meteor -o) ]

      queue %[echo "-----> Building app"]
      queue %[cd #{deploy_to}/#{current_path}/admin && #{deploy_to}/#{shared_path}/meteor/.meteor/meteor build ./build --directory --server-only]

      queue %[echo "-----> Restarting app"]
      queue %[sudo monit restart #{monit_app_name}]
    end
  end
end
