#!/bin/bash
echo 'The project will start updating in 3 seconds'
printf '====>  To stop just hit "CTRL + C" \n\n'

sleep 3 # wait 3 seconds

# Update repository origin
git fetch --all

# Upgrade
git merge origin/master

printf '\n\n ====> The project is updated.'
