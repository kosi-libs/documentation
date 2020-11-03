#!/bin/bash

set -e

npm install

mv docs/CNAME .

rm -rf docs

./node_modules/@antora/cli/bin/antora generate --fetch antora-playbook.yml

cd static_redirect_gen
./gradlew run
cd ..

mv CNAME docs
