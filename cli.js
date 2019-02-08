#!/usr/bin/env node

// Copyright 2019 Zaiste & contributors. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const validateNode = require('validate-node-version')('>=7.6.x');

if (!validateNode.satisfies) {
  console.error(validateNode.message);
  process.exit(1);
}

const argv = require('yargs')
  .version()
  .usage('Usage: huncwot <command> [options]')
  .command(
    ['new [dir]', 'init', 'n'],
    'Create new project',
    require('./cli/init')
  )
  .example('$0 new my-project', 'Create and initialize `my-project` directory')
  .command(
    ['start', 'start', 's'],
    'Start the application',
    require('./cli/start')
  )
  .example('$0 start', 'Start the application')
  .command(
    ['client', 'client', 'c'],
    'Start only the client',
    require('./cli/client')
  )
  .example('$0 client', 'Start only the client')
  .command(
    ['server [dir]', 'serve', 'se'],
    'Serve the directory',
    require('./cli/server')
  )
  .example('$0 server --port 4000', 'Serve the directory at the port 4000')
  .command(
    ['database [command]', 'db'],
    'Database operations',
    require('./cli/database')
  )
  .command(
    ['deploy', 'deploy', 'de'],
    'Deploy the application',
    require('./cli/deploy')
  )
  .example('$0 deploy', 'Deploy the application')
  .demandCommand(1, 'You need at least one command before moving on')
  .help('h')
  .alias('h', 'help')
  .epilogue(
    'for more information, find the documentation at https://huncwot.org'
  ).argv;
