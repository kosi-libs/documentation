#!/bin/bash

set -e

npm install

./node_modules/@antora/cli/bin/antora generate --fetch antora-playbook.yml
