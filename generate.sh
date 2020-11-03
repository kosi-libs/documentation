#!/bin/bash

set -e

npm install

rm -rf docs

./node_modules/@antora/cli/bin/antora generate --fetch antora-playbook.yml

cd static_redirect_gen
./gradlew run
cd ..

echo "docs.kodein.org" >> docs/CNAME
