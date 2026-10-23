#!/bin/bash

set -e

npm install

(cd ui && npm install && npx gulp bundle)

./node_modules/@antora/cli/bin/antora generate --fetch antora-playbook.yml
